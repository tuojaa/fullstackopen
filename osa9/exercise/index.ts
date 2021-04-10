import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    
    const bmi = calculateBmi({ height, weight });
    res.json({ bmi, height, weight });
  } catch(error) {
    if(error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      throw error;
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});