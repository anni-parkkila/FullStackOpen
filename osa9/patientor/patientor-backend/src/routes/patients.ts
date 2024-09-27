import express, { Response } from "express";
import patientService from "../services/patientService";
import { Patient } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<Patient[]>) => {
  res.send(patientService.getNonSensitivePatientData());
});

export default router;
