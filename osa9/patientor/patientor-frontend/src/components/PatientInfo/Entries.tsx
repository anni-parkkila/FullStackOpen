import axios from "axios";
import { Button } from "@mui/material";
import { useState } from "react";

import { Diagnosis, EntryFormValues, Entry } from "../../types";
import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";

interface Props {
  patientId: string;
  entries: Entry[];
  diagnoses: Diagnosis[];
  setRender: React.Dispatch<React.SetStateAction<string>>;
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

const AllEntries = ({ patientId, entries, diagnoses, setRender }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      await patientService.addEntry(patientId, values);
      setModalOpen(false);
      setRender("render");
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

  return (
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

      {entries.map((entry) => {
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
      })}
    </div>
  );
};

export default AllEntries;
