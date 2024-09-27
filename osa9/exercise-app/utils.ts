export const parseArguments = (args: string[]) => {
  if (args.length < 4) throw new Error("Not enough arguments");

  args.slice(2).map((a) => {
    if (isNotNumber(a)) {
      throw new Error("Provided values were not numbers!");
    }
  });

  const calculator: string | undefined = args[1].split("/").at(-1);
  console.log("calculator", calculator);
  if (calculator === "bmiCalculator.ts") {
    console.log("iffffffi");
    if (args.length > 4) {
      throw new Error("Too many arguments");
    }
  }
  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  };
  // } else {
  //   return {
  //     targetValue: Number(process.argv[2]),
  //     reportedHours: process.argv.slice(3).map((a) => Number(a)),
  //   };
  // }
};

const isNotNumber = (argument: any): boolean => {
  return isNaN(Number(argument));
};
