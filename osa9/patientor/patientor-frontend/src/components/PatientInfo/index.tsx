import { Diagnosis, Patient } from "../../types";

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
  return (
    <div>
      <h2>{patient.name}</h2>
      <div>
        <strong>ssn:</strong> {patient.ssn}
        <br />
        <strong>occupation:</strong> {patient.occupation}
      </div>
      <div>
        <h3>Entries</h3>
        {patient.entries &&
          patient.entries.map((entry) => {
            return (
              <div key={entry.id}>
                <strong>{entry.date}:</strong> <em>{entry.description}</em>
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
            );
          })}
      </div>
    </div>
  );
};

export default PatientInfoPage;
