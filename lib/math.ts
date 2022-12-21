// Returns the sum of 2 numbers
export const sum = (first: number, second: number) => first + second;

// Returns the sum of an array of numbers
export const sumAll = (numbers: number[]) => numbers.reduce(sum);

// Retruns the subtraction of 2 numbers
export const subtract = (first: number, second: number) => first - second;

// Returns the subtraction of an array of numbers
export const subtractAll = (numbers: number[]) => numbers.reduce(subtract);

// Returns the multiplication of 2 numbers
export const multiply = (first: number, second: number) => first * second;

// Returns the multiplication of an array of numbers
export const multiplyAll = (numbers: number[]) => numbers.reduce(multiply);

// Returns the division of 2 numbers
export const divide = (first: number, second: number) => first / second;

// Returns the division of an array of numbers
export const divideAll = (numbers: number[]) => numbers.reduce(divide);
