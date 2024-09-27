const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = Number((weight / (height * 0.01) ** 2).toFixed(1));
  switch (true) {
    case bmi < 16.0:
      return "Underweight (Severe thinness)";
    case bmi >= 16.0 && bmi <= 16.9:
      return "Underweight (Moderate thinness)";
    case bmi >= 17.0 && bmi <= 18.4:
      return "Underweight (Mild thinness)";
    case bmi >= 18.5 && bmi <= 24.9:
      return "Normal range";
    case bmi >= 25.0 && bmi <= 29.9:
      return "Overweight (Pre-obese)";
    case bmi >= 30.0 && bmi <= 34.9:
      return "Obese (Class I)";
    case bmi >= 35.0 && bmi <= 39.9:
      return "Obese (Class II)";
    case bmi >= 40.0:
      return "Obese (Class III)";
    default:
      throw new Error("Something went wrong");
  }
};

const parseArguments = (args: string[]) => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  args.slice(2).map((a) => {
    if (isNaN(Number(a))) {
      throw new Error("Provided values were not numbers!");
    }
  });

  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  };
};

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateBmi;
