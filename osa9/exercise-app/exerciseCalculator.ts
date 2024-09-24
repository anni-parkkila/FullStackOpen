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
  }
};

const calculateExercises = (hours: number[], target: number): ExerciseHours => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
