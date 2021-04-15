import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { addEntry, setPatientDetails, useStateValue } from '../state';
import { Patient, Entry as EntryType } from '../types';
import { apiBaseUrl } from "../constants";
import { Button, Icon } from 'semantic-ui-react';
import Entry from './Entry';
import { EntryFormValues } from './AddEntryForm';
import { AddEntryModal } from './AddEntryModal';

interface PatientParams {
  id: string
}

const PatientDetails = () => {
  const { id }  = useParams<PatientParams>();
  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[id];

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<EntryType>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(patient, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };


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
      <h3>Entries</h3>
      {patient.entries?.map(entry => (<Entry key={entry.id} entry={entry} />))}

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />    
      <Button onClick={() => openModal()}>Add New Entry</Button>

    </div>
  );
};

export default PatientDetails;