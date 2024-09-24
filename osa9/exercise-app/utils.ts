export const parseArguments = (args: string[]) => {
  if (args.length < 4) throw new Error("Not enough arguments");

  args.slice(2).map((a) => {
    if (isNotNumber(a)) {
      throw new Error("Provided values were not numbers!");
    }
  });

  const calculator: string = args[1].split("/").at(-1);
  if (calculator === "bmiCalculator.ts") {
    if (args.length > 4) {
      throw new Error("Too many arguments");
    }
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else if (calculator === "exerciseCalculator.ts") {
    return {
      targetValue: Number(process.argv[2]),
      reportedHours: process.argv.slice(3).map((a) => Number(a)),
    };
  }
};

const isNotNumber = (argument: any): boolean => {
  return isNaN(Number(argument));
};
