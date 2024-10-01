import { Diagnosis, Patient } from "../../types";
import EntryDetails from "./EntryDetails";

import Icon from "@mui/material/Icon";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

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
  patient: Patient | undefined;
  diagnoses: Diagnosis[];
}

interface DiagnosisProps {
  code: string;
  diagnoses: Diagnosis[];
}

const DiagnosisItem = ({ code, diagnoses }: DiagnosisProps) => {
  const diagnosis = diagnoses.find((d) => d.code === code);
  return (
    <li>
      {diagnosis?.code} {diagnosis?.name}
    </li>
  );
};

const PatientInfoPage = ({ patient, diagnoses }: PatientProps) => {
  if (!patient) return <div>Patient not found!</div>;
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
      <div>
        <h3>Entries</h3>
        {patient.entries && patient.entries.length > 0 ? (
          patient.entries.map((entry) => {
            return (
              <div key={entry.id} className="entryContainer">
                <EntryDetails entry={entry} />
                {entry.diagnosisCodes && (
                  <div>
                    <h4>Diagnoses</h4>
                    <ul>
                      {entry.diagnosisCodes?.map((code) => {
                        return (
                          <DiagnosisItem
                            key={code}
                            code={code}
                            diagnoses={diagnoses}
                          />
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p>Patient has no entries</p>
        )}
      </div>
    </div>
  );
};

export default PatientInfoPage;
