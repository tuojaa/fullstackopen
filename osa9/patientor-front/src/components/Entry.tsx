import React from 'react';
import { Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Entry as EntryType, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types';
import HealthRatingBar from './HealthRatingBar';

type EntryProps = {
  entry: EntryType;
};

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  const [{ diagnosis  }] = useStateValue();
  return (
    <div>
      <h2>{entry.date} <Icon name='doctor'/></h2>
      <div><i>{entry.description}</i></div>
      <ul>
        {entry.diagnosisCodes?.map( code => (<li key={code}>{code}: {diagnosis[code] && diagnosis[code].name}</li>))}
      </ul>
      <HealthRatingBar rating={entry.healthCheckRating as number} showText={true}/>
    </div>);
};

const OccupationalHealthcareEntryDetails = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  const [{ diagnosis  }] = useStateValue();
  return (
    <div>
      <h2>{entry.date} <Icon name='factory'/> {entry.employerName}</h2>
      <div><i>{entry.description}</i></div>
      <ul>
        {entry.diagnosisCodes?.map( code => (<li key={code}>{code}: {diagnosis[code] && diagnosis[code].name}</li>))}
      </ul>
      {entry.sickLeave ? (
        <div>Sick leave {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</div>
      ) : "" }
    </div>);
};

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  const [{ diagnosis  }] = useStateValue();
  return (
    <div>
      <h2>{entry.date} <Icon name='hospital outline'/></h2>
      <div><i>{entry.description}</i></div>
      <ul>
        {entry.diagnosisCodes?.map( code => (<li key={code}>{code}: {diagnosis[code] && diagnosis[code].name}</li>))}
      </ul>
      Discharged on {entry.discharge.date}: {entry.discharge.criteria}
    </div>);
};

const EntryDetails = ({ entry }: EntryProps) => {
  switch(entry.type) {
    case "Hospital":
      return (<HospitalEntryDetails entry={entry} />);
    case "OccupationalHealthcare":
      return (<OccupationalHealthcareEntryDetails entry={entry} />);
    case "HealthCheck":
      return (<HealthCheckEntryDetails entry={entry} />);
    default:
      assertNever(entry);
      return (<></>);
  }
};

const Entry = ({ entry }: EntryProps) => {
  const style = {
    border: "1px solid black",
    margin: "10px"
  };
  return (
    <div style={style}>
      <EntryDetails entry={entry} />
    </div>
  );
};

export default Entry;

function assertNever(_entry: never) {
  throw new Error('Function not implemented.');
}
