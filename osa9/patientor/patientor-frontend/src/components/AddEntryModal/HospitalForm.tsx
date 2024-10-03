import { Input, InputLabel, TextField } from "@mui/material";

interface Props {
  criteria: string;
  setCriteria: React.Dispatch<React.SetStateAction<string>>;
  dischargeDate: string;
  setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
}

const HospitalForm = ({
  criteria,
  setCriteria,
  dischargeDate,
  setDischargeDate,
}: Props) => {
  return (
    <>
      <InputLabel style={{ marginTop: 20 }}>Discharge</InputLabel>
      <TextField
        label="Criteria"
        fullWidth
        value={criteria}
        onChange={({ target }) => setCriteria(target.value)}
      />
      <InputLabel style={{ marginTop: 20 }}>Discharge date</InputLabel>
      <Input
        type="date"
        style={{ marginBottom: 20 }}
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
      />
    </>
  );
};

export default HospitalForm;
