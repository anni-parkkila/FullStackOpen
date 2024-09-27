import { Diagnosis } from "../types";
import diagnoses from "../../data/diagnoses";

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

// const addDiagnosis = () => {
//   return null;
// };

export default {
  getDiagnoses,
  // addDiagnosis,
};
