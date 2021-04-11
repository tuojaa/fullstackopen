import calculateBmi from './services/bmi';

try {
  if (process.argv.length !== 4) {
    throw new Error('Incorrect number of arguments');
  } else {
    const height = Number(process.argv[2]);
    const weight = Number(process.argv[3]);
   
  
    console.log(calculateBmi({ height, weight }));
  }      
} catch(error) {  
  if(error instanceof Error) {
    console.error(error.message);
  } else {
    throw error;
  }
}
