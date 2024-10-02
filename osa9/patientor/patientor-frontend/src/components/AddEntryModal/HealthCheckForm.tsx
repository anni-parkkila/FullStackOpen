import { InputLabel, MenuItem, Select } from "@mui/material";

interface Props {
  healthCheckRating: number;
  setHealthCheckRating: React.Dispatch<React.SetStateAction<number>>;
}

const healthCheckRatingOptions = [0, 1, 2, 3];

const HealthCheckForm = ({
  healthCheckRating,
  setHealthCheckRating,
}: Props) => {
  return (
    <>
      <InputLabel style={{ marginTop: 20 }}>Health Check Rating</InputLabel>
      <Select
        label="Health Check Rating"
        fullWidth
        value={healthCheckRating}
        onChange={({ target }) => setHealthCheckRating(Number(target.value))}
      >
        {healthCheckRatingOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default HealthCheckForm;
