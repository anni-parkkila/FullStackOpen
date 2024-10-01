import { Patient } from "../../types";

interface Props {
  patient: Patient | undefined;
}

const PatientInfoPage = ({ patient }: Props) => {
  console.log("patient info", patient);
  if (!patient) return <div>Patient not found!</div>;
  return (
    <div>
      <h2>{patient.name}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientInfoPage;
