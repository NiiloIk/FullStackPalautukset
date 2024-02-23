interface returnValues {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}
interface inputValues {
  target: number
  exercises: number[]
}

const parseExerciseArguments = (args: string[]): inputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  
  const target = Number(args[2]);
  if (isNaN(target)) throw new Error('Provided values were not numbers!');

  const exercises = args.slice(3).map(Number).filter(num => !isNaN(num));
  if (exercises.length === 0) throw new Error('No valid exercise values');
  
  return { target, exercises };
};


const ratingDescriptions: { [key: number]: string } = {
  1: "Bad",
  2: "Okay",
  3: "Great!!",
};

export const calculateExercises = (target: number, exercises: number[] ): returnValues => {
  const periodLength = exercises.length;

  const trainingDays = exercises.reduce((exerciseDays: number, exercise: number) => {
    return exercise !== 0 ? exerciseDays + 1 : exerciseDays;
  }, 0);

  const average = exercises.reduce((allValues: number, exercise: number) => {
    return allValues + exercise;
  }, 0) / exercises.length;

  let rating = Math.floor(average / target * 3);
  rating = rating < 0 ? 0 : rating;
  rating = rating > 3 ? 3 : rating;

  const ratingDescription: string = ratingDescriptions[rating] || "Oh no!";

  const success: boolean = rating === 3 ? true : false;

  return { 
      periodLength, trainingDays, success, rating,
      ratingDescription, target, average
  };
};


try {
  const { target, exercises } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(target, exercises));

} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}