function calculateBmi({ height, weight }: { height: number; weight: number }): string {
  if ((!height) || (!weight)) {
    throw new Error('Must provide height and weight as numbers');
  }
  const bmi = weight / ((height / 100) ** 2);
  if (bmi < 15)
    return 'Very severely underweight';
  if (bmi < 16)
    return 'Severely underweight';
  if (bmi < 18.5)
    return 'Underweight';
  if (bmi < 25)
    return 'Normal (healthy weight)';
  if (bmi < 30)
    return 'Overweight';
  if (bmi < 35)
    return 'Obese Class I (Moderately obese)';
  if (bmi < 40)
    return 'Obese Class II (Severely obese)';
  return 'Obese Class III (Very severely obese)';
}
export default calculateBmi;
