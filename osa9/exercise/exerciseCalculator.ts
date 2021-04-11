import calculateExercises from './services/exercise';

try {
  if(process.argv.length < 4) {
    throw new Error('Insufficient number of arguments');
  }
  const target = Number(process.argv[2]);
  const dailyExerciseHours : Array<number> = process.argv.slice(3).map((arg) => Number(arg));
  console.log(calculateExercises(dailyExerciseHours, target));
} catch(error) {
  if(error instanceof Error) {
    console.error(error.message);
  } else {
    throw error;
  }
}