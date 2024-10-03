import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Diagnosis, Patient } from "../../types";
import patientService from "../../services/patients";
import AllEntries from "./Entries";

const genderIcon = (gender: string) => {
  switch (gender) {
    case "male":
      return <MaleIcon />;
    case "female":
      return <FemaleIcon />;
    case "other":
      return <TransgenderIcon />;
  }
};

interface PatientProps {
  diagnoses: Diagnosis[];
}

const PatientInfoPage = ({ diagnoses }: PatientProps) => {
  const [patient, setPatient] = useState<Patient | undefined>();
  const [render, setRender] = useState("");

  const id = useParams().id as string;

  useEffect(() => {
    const findPatientInfo = async () => {
      try {
        const patient = await patientService.getById(id);
        setPatient(patient);
        setRender("");
      } catch (error) {
        console.log("error", error);
      }
    };
    void findPatientInfo();
  }, [id, render]);

  if (!id || !patient) return <div>Patient not found!</div>;

  const icon = genderIcon(patient.gender);
  return (
    <div>
      <h2>
        {patient.name} {icon}
      </h2>
      <div>
        <strong>ssn:</strong> {patient.ssn}
        <br />
        <strong>occupation:</strong> {patient.occupation}
      </div>
      {patient.entries && patient.entries.length > 0 ? (
        <AllEntries
          patientId={patient.id}
          entries={patient.entries}
          diagnoses={diagnoses}
          setRender={setRender}
        />
      ) : (
        <p>Patient has no entries</p>
      )}
    </div>
  );
};

export default PatientInfoPage;
