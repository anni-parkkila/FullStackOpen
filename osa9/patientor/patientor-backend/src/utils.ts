import { NewPatient, Gender, Diagnosis, NewEntry, EntryType } from "./types";
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

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isEntryType = (param: string): param is EntryType => {
  return Object.values(EntryType)
    .map((v) => v.toString())
    .includes(param);
};

const parseEntryType = (type: unknown): EntryType => {
  if (!isString(type) || !isEntryType(type)) {
    throw new Error("Incorrect or missing entry type: " + type);
  }
  return type;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing entry date: " + date);
  }
  return date;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect or missing specialist name");
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }
  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "type" in object &&
    "description" in object &&
    "date" in object &&
    "specialist" in object
  ) {
    const newEntry = {
      ...object,
      type: parseEntryType(object.type),
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes:
        "diagnosisCodes" in object ? parseDiagnosisCodes(object) : undefined,
    } as NewEntry;
    switch (object.type) {
      case "Hospital":
        if (
          "discharge" in object &&
          typeof object.discharge === "object" &&
          object.discharge &&
          "date" in object.discharge &&
          "criteria" in object.discharge &&
          (object.discharge.date === "" || object.discharge.criteria === "")
        ) {
          throw new Error("Discharge date missing");
        }
        return newEntry;
      case "OccupationalHealthcare":
        if (
          "sickLeave" in object &&
          typeof object.sickLeave === "object" &&
          object.sickLeave &&
          (!("startDate" in object.sickLeave) ||
            !("endDate" in object.sickLeave))
        ) {
          throw new Error("Start or end date missing from sick leave");
        }
        if (
          "employerName" in object &&
          object.employerName &&
          isString(object.employerName)
        ) {
          return newEntry;
        } else {
          throw new Error("Employer name missing");
        }
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          return newEntry;
        } else {
          throw new Error("Health check rating missing");
        }
    }
    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};
