import React from 'react';
import { Entry as EntryType } from '../types';

type EntryProps = {
  entry: EntryType;
};

const Entry = ({ entry }: EntryProps) => {
  return (
    <div>
      <div>{entry.date} <i>{entry.description}</i></div>
      <ul>
        {entry.diagnosisCodes?.map( code => (<li key={code}>{code}</li>))}
      </ul>
    </div>
  );
};

export default Entry;