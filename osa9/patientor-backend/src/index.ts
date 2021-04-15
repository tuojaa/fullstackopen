import express from 'express';
import cors from 'cors';

import { getDiagnoses } from './services/diagnoses';
import { getNonSensitivePatients, addPatient, getPatientById, addEntry } from './services/patients';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
    res.json(getDiagnoses());
});

app.get('/api/patients', (_req, res) => {
    res.json(getNonSensitivePatients());
});

app.get('/api/patients/:id', (req, res) => {
  res.json(getPatientById(req.params.id));
});

app.post('/api/patients/:id/entries', (req, res) => {
  const patient = getPatientById(req.params.id);
  if(!patient) {
    res.status(404).send("Patient not found!");
    return;
  }
  try {
    const addedEntry = addEntry(patient, req.body);
    res.json(addedEntry);
  } catch(error) {
    if(error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      throw error;
    }
  }
});


app.post('/api/patients', (req, res) => {
  try {
    const addedPatient = addPatient(req.body);
    res.json(addedPatient);
  } catch(error) {
    if(error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      throw error;
    }
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});