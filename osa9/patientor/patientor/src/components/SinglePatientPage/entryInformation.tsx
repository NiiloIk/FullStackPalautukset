import React from "react";
import { Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";
import WorkIcon from '@mui/icons-material/work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Box } from "@mui/material";

export const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  const boxStyle = {
    paddingLeft: 5
  };

  return (
    <Box sx={{ border: 1, borderColor: "black", borderRadius: 1 }}>
      <div style={boxStyle}>
        <p>{entry.date} <LocalHospitalIcon /></p>
        <p><i>{entry.description}</i></p>
        <p>Discharge {entry.discharge.date}</p>
        <p>discharge criteria: {entry.discharge.criteria}</p>
        <p>diagnose by {entry.specialist}</p>
      </div>
    </Box>
  );
};

const OccupationalHealthcareEntryDetails = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  const boxStyle = {
    paddingLeft: 5
  };

  return (
    <Box sx={{ border: 1, borderColor: "black", borderRadius: 1 }}>
      <div style={boxStyle}>
        <p>{entry.date} <WorkIcon /> {entry.employerName}</p>
        <p><i>{entry.description}</i></p>
        <p>diagnose by {entry.specialist}</p>
      </div>
    </Box>
  );
};

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  const boxStyle = {
    paddingLeft: 5
  };
  const HealthCheckRating = ({ rating }: { rating: number }) => {
    switch (rating) {
      case 0:
        return <FavoriteIcon color="success" />;
      case 1:
        return <FavoriteIcon color="warning" />;
      case 2:
        return <FavoriteIcon color="warning" />;
      default:
        return <FavoriteIcon color="error" />;
    }
  };

  return (
    <Box sx={{ border: 1, borderColor: "black", borderRadius: 1 }}>
      <div style={boxStyle}>
        <p>{entry.date} <MedicalServicesIcon /></p>
        <p><i>{entry.description}</i></p>
        <HealthCheckRating rating={entry.healthCheckRating} />
        <p>diagnose by {entry.specialist}</p>
      </div>
    </Box>
  );
};

const EntryInformation = ({ entries, diagnosis }: { entries: Entry[], diagnosis: Diagnosis[] | null }) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntryDetails entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntryDetails entry={entry} />;
      case 'HealthCheck':
        return <HealthCheckEntryDetails entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      <h3>entries</h3>
      {entries.map(entry => (
        <div key={entry.id}>
          <EntryDetails entry={entry} />
          <ul>
            {entry.diagnosisCodes && diagnosis && entry.diagnosisCodes.map((code, index) => (
              <li key={index}>{code} {diagnosis.find(d => d.code === code)?.name}</li>
            ))}
          </ul>
        </div>
      ))}
      {entries.length === 0 && <p>no entries</p>}
    </div>
  );
};

export default EntryInformation;