import axios from "axios";
import { Button } from "@mui/material";

import { Diagnosis, EntryFormValues, Patient } from "../../types";
import EntryDetails from "./EntryDetails";

import AddEntryModal from "../AddEntryModal";

import patientService from "../../services/patients";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { useState } from "react";

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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [entries, setEntries] = useState([]);

  if (!patient) return <div>Patient not found!</div>;

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.addEntry(patient.id, values);
      setEntries(entries.concat(entry));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
          diagnoses={diagnoses}
        />
        <Button
          style={{ marginBottom: 10 }}
          variant="contained"
          onClick={() => openModal()}
        >
          Add New Entry
        </Button>
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
