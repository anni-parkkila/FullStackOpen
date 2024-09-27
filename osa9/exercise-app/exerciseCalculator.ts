interface ExerciseHours {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const averageHours = (hours: number[]): number => {
  return (
    hours.reduce((total, current) => {
      return total + current;
    }, 0) / hours.length
  );
};

const rating = (average: number, target: number): number => {
  const sub = average - target;
  switch (true) {
    case sub >= 0:
      return 3;
    case sub < 0 && sub >= -0.5:
      return 2;
    case sub < -0.5:
      return 1;
    default:
      throw new Error("Something went wrong");
  }
};

const ratingDescription = (rating: number): string => {
  switch (rating) {
    case 3:
      return "Target hours met, well done!";
    case 2:
      return "Not too bad but could be better";
    case 1:
      return "Average well below target";
    default:
      throw new Error("Something went wrong");
  }
};

const calculateExercises = (hours: number[], target: number): ExerciseHours => {
  hours.map((h) => {
    if (isNaN(Number(h))) {
      throw new Error("Provided values were not numbers!");
    }
  });

  if (isNaN(Number(target))) {
    throw new Error("Provided values were not numbers!");
  }

  const avg = averageHours(hours);
  const days = hours.filter((h) => h > 0).length;

  const calculations = {
    periodLength: hours.length,
    trainingDays: days,
    success: target <= avg,
    rating: rating(avg, target),
    ratingDescription: ratingDescription(rating(avg, target)),
    target: target,
    average: avg,
  };
  return calculations;
};

const parseArguments = (args: string[]) => {
  if (args.length < 4) throw new Error("Not enough arguments");

  args.slice(2).map((a) => {
    if (isNaN(Number(a))) {
      throw new Error("Provided values were not numbers!");
    }
  });

  return {
    targetValue: Number(process.argv[2]),
    reportedHours: process.argv.slice(3).map((a) => Number(a)),
  };
};

if (require.main === module) {
  try {
    const { targetValue, reportedHours } = parseArguments(process.argv);
    console.log(calculateExercises(reportedHours, targetValue));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateExercises;
