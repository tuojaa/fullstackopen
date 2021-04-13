import express from 'express';
import cors from 'cors';

import { getDiagnoses } from './models/diagnoses';
import { getNonSensitivePatients } from './models/patients';

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


const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});