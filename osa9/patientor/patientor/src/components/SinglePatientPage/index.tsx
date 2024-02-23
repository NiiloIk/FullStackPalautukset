import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import { useEffect, useState } from "react";
import patientService from '../../services/patients';

import EntryForm from "./entryForm";
import EntryInformation from "./entryInformation";

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Button } from "@mui/material";

const SinglePatientPage = ({ diagnosis }: { diagnosis: Diagnosis[] | null }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [formType, setFormType] = useState("");
  const params = useParams();

  useEffect(() => {
    const getPatientInfo = async () => {
      if (params.id) {
        const info = await patientService.getById(params.id);
        setPatient(info.data);
      }
    };
    getPatientInfo();
  }, [params.id]);

  if (!patient) {
    return <div>Patient not found</div>;
  }

  const genderIcon = (gender: string) => {
    switch (gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      default:
        return <p>gender: {gender}</p>;
    }
  };

  return (
    <div>
      <h2>Patient details</h2>
      <h3>{patient.name} {genderIcon(patient.gender)}</h3>
      <p>SSN: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>

      <h4>New Healthcheck entry</h4>
      {formType && (<EntryForm id={patient.id} setForm={setFormType} setPatient={setPatient} />)}

      {!formType &&
        <div>
          <Button color="primary" onClick={() => setFormType('HealthCheck')}>HealthCheck</Button>
          <Button color="primary" onClick={() => setFormType('Hospital')}>Hospital</Button>
          <Button color="primary" onClick={() => setFormType('OccupationalHealthcare')}>Occupational Healthcare</Button>
        </div>
      }

      <EntryInformation entries={patient.entries} diagnosis={diagnosis} />

    </div>
  );
};

export default SinglePatientPage;