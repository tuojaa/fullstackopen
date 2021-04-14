import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { setPatientDetails, useStateValue } from '../state';
import { Patient } from '../types';
import { apiBaseUrl } from "../constants";
import { Icon } from 'semantic-ui-react';

interface PatientParams {
  id: string
}

const PatientDetails = () => {
  const { id }  = useParams<PatientParams>();
  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[id];

  useEffect(() => {
    if(patients[id] && patients[id].ssn) 
      return;
    const getDetails = async () => {
      const { data: patientDetailsFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      return patientDetailsFromApi;
    };
    getDetails()
      .then(patientDetailsFromApi => {
        dispatch(setPatientDetails(patientDetailsFromApi));  
      })
      .catch(error => {
        console.error(error);
      });
  }, [patients]);

  if(!patient) {
    return (<div>Not found!</div>);
  }
  
  const iconName = (gender: string) => {
    switch(gender) {
      case 'male': return 'mars';
      case 'female': return 'venus';
      case 'other': return 'transgender';
      default: return 'genderless';
    }
  };

  return (
    <div>
      <h2>{patient.name} <Icon name={iconName(patient.gender)}/></h2>
      
      <p>ssn: {patient.ssn}</p>
      <p>dob: {patient.dateOfBirth}</p>
    </div>
  );
};

export default PatientDetails;