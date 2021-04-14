import express from 'express';
import cors from 'cors';

import { getDiagnoses } from './services/diagnoses';
import { getNonSensitivePatients, addPatient } from './services/patients';

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