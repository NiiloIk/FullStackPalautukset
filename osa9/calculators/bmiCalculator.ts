interface BMIValues {
  heightInCm: number,
  massInKg: number
}

const parseArguments = (args: string[]): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heightInCm: Number(args[2]),
      massInKg: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBMI = (heightInCm: number, massInKg: number): string => {
  const heightInM = heightInCm / 100;
  const bmi = massInKg / heightInM**2;
  let message = "";

  if (bmi < 18.5) {
    message += "Underweight";
  } else if (bmi < 25) {
    message += "Normal";
  } else {
    message = "Overweight";
  }

  return `${message}`;
};


try {
  const { heightInCm, massInKg } = parseArguments(process.argv);
  console.log(calculateBMI(heightInCm, massInKg));
} catch(error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}