import { v1 as uuid } from "uuid";
import { Patient, NonSensitivePatientData, NewPatient } from "../types";
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

export default {
  getPatients,
  getNonSensitivePatientData,
  getPatientInfo,
  addPatient,
};
