
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import React, { useState } from 'react';
import patientService from '../../services/patients';
import { Patient } from "../../types";
import { AxiosError } from 'axios';

interface Props {
  id: string
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>
  setForm: React.Dispatch<React.SetStateAction<string>>
}

const Notification = ({ comment }: { comment: string }) => {
  if (!comment) return <></>;

  return (
    <Alert severity="info">
      {comment}
    </Alert>
  );
};

const EntryForm = ({ id, setPatient, setForm }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const [errorString, setErrorString] = useState('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newCodes = diagnosisCodes.split(",");

    const newEntry = {
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      diagnosisCodes: newCodes,
      type: 'HealthCheck' as const
    };
    try {
      const entry = await patientService.createEntry(newEntry, id);
      setPatient(entry);

      setDescription('');
      setDate('');
      setSpecialist('');
      setHealthCheckRating('');
      setDiagnosisCodes('');
    } catch (e) {
      const error = e as AxiosError;
      if (error && error.response && error.response.data) {
        setErrorString(JSON.stringify(error.response.data));
      }
    }
  };
  return (
    <div>
      {errorString && (<Notification comment={errorString} />)}

      <form onSubmit={handleSubmit}>
        <Box sx={{ p: 2, border: 1, borderColor: "black", borderRadius: 1 }}>
          <Typography variant="h6">Health Check Form</Typography>
          <TextField
            fullWidth
            required
            label="Description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            type="date"
            label="Date"
            name="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            label="Specialist"
            name="specialist"
            value={specialist}
            onChange={(event) => setSpecialist(event.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            label="healthCheckRating-label"
            name="healthCheckRating-label"
            value={healthCheckRating}
            onChange={(event) => setHealthCheckRating(event.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Diagnosis Codes"
            name="diagnosisCodes"
            value={diagnosisCodes}
            onChange={(event) => setDiagnosisCodes(event.target.value)}
            margin="normal"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button onClick={() => setForm("")} variant="contained" color="error">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default EntryForm;