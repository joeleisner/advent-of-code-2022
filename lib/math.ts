// Returns the sum of 2 numbers
export const sum = (first: number, second: number) => first + second;

// Returns the sum of an array of numbers
export const sumAll = (numbers: number[]) => numbers.reduce(sum);

// Returns the multiplication of 2 numbers
export const multiply = (first: number, second: number) => first * second;

// Returns the multiplication of an array of numbers
export const multiplyAll = (numbers: number[]) => numbers.reduce(multiply);
