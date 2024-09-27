import express, { Response } from "express";
import diagnosisService from "../services/diagnosisService";
import { Diagnosis } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosisService.getDiagnoses());
});

export default router;
