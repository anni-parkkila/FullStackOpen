import { v1 as uuid } from "uuid";
import {
  Patient,
  NonSensitivePatientData,
  NewPatient,
  Entry,
  NewEntry,
} from "../types";
import patients from "../../data/patients";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientInfo = (id: string): Patient | undefined => {
  const found = patients.find((patient) => patient.id === id);
  return found;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
    entries: [],
  };
  patients.push(newPatient);
  return newPatient;
};

const addNewEntry = (id: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  const patientToUpdate = patients.find((patient) => patient.id === id);
  patientToUpdate?.entries?.push(newEntry);
  console.log("entry", entry);
  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatientData,
  getPatientInfo,
  addPatient,
  addNewEntry,
};
