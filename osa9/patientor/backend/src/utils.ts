import { DiagnoseEntry, EntryTypes, EntryWithoutId, Gender, NewPatientEntry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }
  return comment;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if ( !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if ( !isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing date: ' + gender);
  }
  return gender;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newEntry: NewPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: []
    };
  
    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};


const parseDiagnosisCodes = (object: unknown): Array<DiagnoseEntry['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnoseEntry['code']>;
  }

  return object.diagnosisCodes as Array<DiagnoseEntry['code']>;
};

const parseType = (str: unknown): EntryTypes => {
  if (isString(str) && str in EntryTypes) {
    return str as EntryTypes;
  }
  throw new Error('Invalid entry type');
};

interface Discharge {
  date: string;
  criteria: string;
} 

const parseHospitalEntry = (object: unknown): Discharge => {
  if ( object && typeof object === 'object' && 'date' in object && parseDate(object.date) && 'criteria' in object && isString(object.criteria)) {
    return object as Discharge;
  }
  throw new Error('Discharge missing');
};

const ParseHealthCheckRatingEntry = (num: unknown): 0 | 1 | 2 | 3 => {
  if ( typeof num === 'number' && (num === 0 || num === 1 || num === 2 || num === 3) ) {
    return num as 0 | 1 | 2 | 3;
  }
  throw new Error(`Incorrect HealthCheckRating: ${num}`);
};
interface SickLeave {
  startDate: string;
  endDate: string;
}

const parseSickLeave = (object: unknown): SickLeave => {
  if ( object && typeof object === 'object' && 'startDate' in object && parseDate(object.startDate) && 'endDate' in object && parseDate(object.endDate)) {
    return object as SickLeave;
  }
  throw new Error('Sick leave incorrect');
};

export const toNewEntryForPatient = (object: unknown): EntryWithoutId => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('date' in object && 'type' in object && 'specialist' in object && 'description' in object) {
    const baseEntry = {
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      type: parseType(object.type)
    };

    const getEntryType = (baseEntry: EntryWithoutId): EntryWithoutId => {
      if ('diagnosisCodes' in object) {
        baseEntry.diagnosisCodes = parseDiagnosisCodes(object);
      }
      switch(baseEntry.type) {
        case 'Hospital':
          if ('discharge' in object) {
            baseEntry.discharge = parseHospitalEntry(object.discharge);
            return baseEntry;
          } else {
            throw new Error('No discharge');
          }
        case 'HealthCheck':
          if ('healthCheckRating' in object) {
            baseEntry.healthCheckRating = ParseHealthCheckRatingEntry(object.healthCheckRating);
            return baseEntry;
          } else {
            throw new Error('No healthCheck rating');
          }
          
        case 'OccupationalHealthcare':
          if ('employerName' in object) {
            if ('sickLeave' in object) {
              baseEntry.sickLeave = parseSickLeave(object.sickLeave);
            }
            baseEntry.employerName = parseString(object.employerName);
            return baseEntry;
          } else {
            throw new Error('No employer name');
          }
        default:
          throw new Error('Incorrect type');
      }
    };

    return getEntryType(baseEntry as EntryWithoutId);
  }
  throw new Error('Missing data');
};

export default { 
  toNewPatientEntry,
  toNewEntryForPatient
};