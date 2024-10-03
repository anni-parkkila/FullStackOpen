import { Input, InputLabel, TextField } from "@mui/material";

interface Props {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const OccupationalHealthcareForm = ({
  employerName,
  setEmployerName,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: Props) => {
  return (
    <>
      <TextField
        label="Employer name"
        fullWidth
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <InputLabel style={{ marginTop: 20 }}>Sick leave</InputLabel>
      <InputLabel style={{ marginTop: 10, fontSize: "small" }}>
        Start date
      </InputLabel>
      <Input
        type="date"
        aria-label="start"
        value={startDate}
        onChange={({ target }) => setStartDate(target.value)}
      />
      <InputLabel style={{ marginTop: 10, fontSize: "small" }}>
        End date
      </InputLabel>
      <Input
        type="date"
        value={endDate}
        onChange={({ target }) => setEndDate(target.value)}
      />
    </>
  );
};

export default OccupationalHealthcareForm;
