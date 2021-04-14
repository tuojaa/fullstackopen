import React from 'react';
import { useStateValue } from '../state';
import { Entry as EntryType } from '../types';

type EntryProps = {
  entry: EntryType;
};

const Entry = ({ entry }: EntryProps) => {
  const [{ diagnosis  }] = useStateValue();
  return (
    <div>
      <div>{entry.date} <i>{entry.description}</i></div>
      <ul>
        {entry.diagnosisCodes?.map( code => (<li key={code}>{code}: {diagnosis[code] && diagnosis[code].name}</li>))}
      </ul>
    </div>
  );
};

export default Entry;