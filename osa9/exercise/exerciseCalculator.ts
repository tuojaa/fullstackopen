interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number  
}

export const calculateExercises = (dailyExerciseHours: Array<number>, target: number): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(hours => hours>0).length;
  const totalHours = dailyExerciseHours.reduce((prev: number, next: number): number => prev+next, 0);
  const average = totalHours / periodLength;
  const success = dailyExerciseHours.reduce((prev: boolean, next: number): boolean => (prev && (next>=target)), true);
  const successDays = dailyExerciseHours.reduce((prev: number, next: number): number => (prev+((next>=target)?1:0)), 0);
  
  const calculateRating = (successDays: number, periodLength: number): number => {
    const ratio = successDays/periodLength;
    if(ratio > 0.75)
      return 3;
    if(ratio > 0.5)
      return 2;
    return 1;
  };

  const rating = calculateRating(successDays, periodLength);
  const getDescription = (rating: number): string => {
    if(rating===1) 
      return 'Please try harder';
    if(rating===2)
      return 'It was a good effort but could be better';
    if(rating===3)
      return 'You are doing great';
    return 'Unknown';
  };

  const result = {
    periodLength,
    trainingDays,
    average,
    success,
    target,
    rating,
    ratingDescription: getDescription(rating)
  };
  return result;
};

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