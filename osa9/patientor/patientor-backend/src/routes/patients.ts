/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { Response } from "express";
import patientService from "../services/patientService";
import { Patient } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<Patient[]>) => {
  res.send(patientService.getNonSensitivePatientData());
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedPatient = patientService.addPatient(
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  );
  res.json(addedPatient);
});

export default router;
