import { z } from "zod";
import { EntrySchema, NewPatientSchema } from "./utils";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Female = "female",
  Male = "male",
  Other = "other",
}

type Entry = z.infer<typeof EntrySchema>;

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
