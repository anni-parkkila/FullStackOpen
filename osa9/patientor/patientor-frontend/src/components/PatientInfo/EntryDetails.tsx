import {
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from "../../types";

import WorkIcon from "@mui/icons-material/Work";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

const monitorColor = (rating: number) => {
  switch (rating) {
    case 0:
      return "success";
    case 1:
      return "info";
    case 2:
      return "warning";
    case 3:
      return "error";
    default:
      return "primary";
  }
};
interface HospitalProps {
  entry: HospitalEntry;
}

interface OccupationalProps {
  entry: OccupationalHealthcareEntry;
}

interface HealthCheckProps {
  entry: HealthCheckEntry;
}

const HospitalEntryDetails = ({ entry }: HospitalProps) => {
  return (
    <div key={entry.id}>
      <strong>{entry.date}</strong> <LocalHospitalIcon />
      <br />
      <em>{entry.description}</em>
      <br />
      Discharged: {entry.discharge.date}
      <br />
      Criteria: {entry.discharge.criteria}
      <br />
      diagnosis by {entry.specialist}
    </div>
  );
};

const OccupationalEntryDetails = ({ entry }: OccupationalProps) => {
  return (
    <div key={entry.id}>
      <strong>{entry.date}</strong> <WorkIcon /> <em>{entry.employerName}</em>
      <br />
      <em>{entry.description}</em>
      <br />
      diagnosis by {entry.specialist}
    </div>
  );
};

const HealthCheckEntryDetails = ({ entry }: HealthCheckProps) => {
  const color = monitorColor(entry.healthCheckRating);
  return (
    <div key={entry.id}>
      <strong>{entry.date}</strong> <MedicalServicesIcon />
      <br />
      <em>{entry.description}</em>
      <br />
      rating: <MonitorHeartIcon color={color} />
      <br />
      diagnosis by {entry.specialist}
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unknown entry type: ${value}`);
  };
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
