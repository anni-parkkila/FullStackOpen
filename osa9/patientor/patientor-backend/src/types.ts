import { z } from "zod";
import {
  NewEntrySchema,
  // NewHealthCheckEntry,
  // NewHospitalEntry,
  // NewOccupationalHealthcareEntry,
  NewPatientSchema,
} from "./utils";

// export enum EntryType {
//   Hospital = "Hospital",
//   Occupational = "OccupationalHealthcare",
//   Health = "HealthCheck",
// }

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export enum Gender {
  Female = "female",
  Male = "male",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries?: Entry[];
}

export type NonSensitivePatientData = Omit<Patient, "ssn" | "entries">;

export type NewPatient = z.infer<typeof NewPatientSchema>;

export type NewEntry = z.infer<typeof NewEntrySchema>;
