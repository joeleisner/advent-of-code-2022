// Returns the sum of 2 numbers
export const sum = (first: number, second: number) => first + second;

// Returns the sum of an array of numbers
export const sumAll = (numbers: number[]) => numbers.reduce(sum);
