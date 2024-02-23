import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { NewPatientEntry, PatientEntry, NonSensitivePatient, EntryWithoutId } from '../types';

const getEntriesWithoutSSN = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = ( entry: EntryWithoutId, patientId: string ): PatientEntry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  const patient = patients.find(p => p.id === patientId);

  if (patient) {
    patient.entries.push(newEntry);
    return patient;
  } 

  throw new Error('Patient not found');
};

const findById = ( id: string ): PatientEntry | undefined => {
  return patients.find(patient => patient.id === id);
};

export default {
  getEntriesWithoutSSN,
  addPatient,
  findById,
  addEntry
};