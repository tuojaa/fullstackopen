import express from 'express';
import calculateBmi from './services/bmi';
import calculateExercises, { ExerciseResult } from './services/exercise';

const app = express();
app.use(express.json());

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

interface ExerciseBody {
  target: number,
  daily_exercises: Array<number>
}

app.post('/exercises', (req, res) => {
  try {
    console.log(req.body);
    const query : ExerciseBody = req.body as ExerciseBody;
    const result : ExerciseResult = calculateExercises(query.daily_exercises, query.target);
    res.json(result);
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