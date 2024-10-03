import { useState, SyntheticEvent } from "react";

import {
  TextField,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material";

import { Diagnosis, EntryFormValues, EntryType } from "../../types";
import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";
import OccupationalHealthcareForm from "./OccupationalForm";
import { DiagnosisField } from "./DiagnosisField";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[];
}

interface EntryTypeOption {
  value: EntryType;
  label: string;
}

const entryTypeOptions: EntryTypeOption[] = Object.entries(EntryType).map(
  (e) => {
    return {
      value: e[1],
      label: e[0].toString(),
    };
  }
);

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [criteria, setCriteria] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const type = Object.values(EntryType).find((g) => g.toString() === value);
      if (type) {
        setType(type);
      }
    }
  };

  const selectedFormDetails = () => {
    switch (type) {
      case "HealthCheck":
        return (
          <HealthCheckForm
            healthCheckRating={healthCheckRating}
            setHealthCheckRating={setHealthCheckRating}
          />
        );
      case "Hospital":
        return (
          <HospitalForm
            criteria={criteria}
            setCriteria={setCriteria}
            dischargeDate={dischargeDate}
            setDischargeDate={setDischargeDate}
          />
        );
      case "OccupationalHealthcare":
        return (
          <OccupationalHealthcareForm
            employerName={employerName}
            setEmployerName={setEmployerName}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        );
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const diagnosisCodesArray = diagnosisCodes ? diagnosisCodes : [];

    const baseEntry = {
      description,
      date,
      specialist,
      ...(diagnosisCodesArray.length > 0
        ? { diagnosisCodes: diagnosisCodesArray }
        : {}),
    };
    switch (type) {
      case "HealthCheck":
        onSubmit({
          ...baseEntry,
          type,
          healthCheckRating,
        });
        break;
      case "Hospital":
        onSubmit({
          ...baseEntry,
          type,
          discharge: {
            date: dischargeDate,
            criteria,
          },
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          ...baseEntry,
          type,
          employerName,
          ...(startDate && endDate
            ? { sickLeave: { startDate, endDate } }
            : {}),
        });
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
        <Select
          label="Entry type"
          fullWidth
          value={type}
          onChange={onEntryTypeChange}
        >
          {entryTypeOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Visit date</InputLabel>
        <Input
          type="date"
          style={{ marginBottom: 20 }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <DiagnosisField
          diagnoses={diagnoses}
          diagnosisCodes={diagnosisCodes}
          setDiagnosisCodes={setDiagnosisCodes}
        />
        {selectedFormDetails()}
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
