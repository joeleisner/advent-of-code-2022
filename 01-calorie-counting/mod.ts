// Converts the input data into a calorie matrix
export const parseInput = (input: string) => {
    const data = input
        // 1. Split the string by whitespace
        .split(/\s/g)
        // 2. Convert each value to a number
        .map(Number);

    // Set up a calorie matrix...
    const matrix: number[][] = [];
    // ... and a pointer
    let pointer = 0;

    // For each calorie amount of the data:
    for (const calories of data) {
        // If calories are zero,...
        if (!calories) {
            // ... increment the pointer...
            pointer++;
            // ... and continue through the loop
            continue;
        }

        // If there's no calorie set in the matrix at the current pointer value, create it
        if (!matrix[pointer]) matrix[pointer] = [];

        // Push the calorie amount to the calorie set at the current pointer value
        matrix[pointer].push(calories);
    }

    return matrix;
}

// Sums 2 numbers together
const sum = (first: number, second: number) => first + second;

// Sorts an array of numbers in descending order (largest to smallest)
const descending = (previous: number, next: number) => next - previous;

// Converts a calorie matrix into an array of top calories (largets to smallest)
export const topCalories = (matrix: number[][]) => (
    matrix
        // 1. Sum each calorie set
        .map((calorieSet) => calorieSet.reduce(sum))
        // 2. Sort the calorie sums ind descending order (largest to smallest)
        .sort(descending)
);
