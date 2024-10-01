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
                    return <li key={code}>{code}</li>;
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
