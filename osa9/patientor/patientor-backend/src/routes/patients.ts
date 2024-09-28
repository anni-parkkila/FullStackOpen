import express, { Request, Response, NextFunction } from "express";
import { z } from "zod";
import patientService from "../services/patientService";
import { NewPatient, Patient } from "../types";
import { NewPatientSchema } from "../utils";

const router = express.Router();

router.get("/", (_req, res: Response<Patient[]>) => {
  res.send(patientService.getNonSensitivePatientData());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.use(errorMiddleware);

export default router;
