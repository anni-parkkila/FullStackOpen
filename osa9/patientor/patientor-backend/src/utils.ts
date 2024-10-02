import { NewPatient, Gender, HealthCheckRating } from "./types";
import { z } from "zod";

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

const NewBaseEntry = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.string().array().optional(),
});

const NewDischargeSchema = z.object({
  date: z.string().date(),
  criteria: z.string(),
});

const NewSickLeaveSchema = z.object({
  startDate: z.string().date(),
  endDate: z.string().date(),
});

const NewHospitalEntry = NewBaseEntry.extend({
  type: z.literal("Hospital"),
  discharge: NewDischargeSchema,
});

const NewHealthCheckEntry = NewBaseEntry.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const NewOccupationalHealthcareEntry = NewBaseEntry.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: NewSickLeaveSchema.optional(),
});

export const NewEntrySchema = z.union([
  NewHospitalEntry,
  NewHealthCheckEntry,
  NewOccupationalHealthcareEntry,
]);
