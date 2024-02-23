import express from 'express';
const app = express();
import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import qs from 'qs';
app.set('query parser', (str: string) => qs.parse(str));

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.send({ error: "malformatted parameters"});
  }
  
  const bmi = calculateBMI(Number(height), Number(weight));
  return res.send({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (typeof target !== 'number' || isNaN(target) || !Array.isArray(daily_exercises)) {
    return res.send({ error: "malformatted parameters" });
  } 

  const exercises: number[] = daily_exercises
    .map(Number)
    .filter((num: number) => !isNaN(num));

  if (exercises.length === 0) return res.send({ error: "parameters missing" });
  
  try {
    return res.send(calculateExercises(Number(target), exercises));
  } catch(error) {
    return res.send({ error: "malformatted parameters" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});