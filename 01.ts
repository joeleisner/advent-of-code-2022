// Grab the raw data from a text file
const raw = await Deno.readTextFile('./data/01.txt');
// Example: 100\n200\n300\n\n400\n500\n\n800

// Convert the raw data to an array of numbers (with empty strings converted to a zero)
const data = raw
    .split(/\s/g) // 1. Split the string by whitespace
    .map(Number); // 2. Convert each value to a number
// Example: [ 100, 200, 300, 0, 400, 500, 0, 800 ]

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
// Example: [[ 100, 200, 300 ], [ 400, 500 ], [ 800 ]]

// Grab the top 3 most amount of calories from the matrix after...
const [
    mostCalories,
    secondMostCalories,
    thirdMostCalories
] = matrix
    // ... totalling each calorie set in the matrix...
    .map((calorieSet) => calorieSet.reduce((total, calories) => total + calories, 0))
    // ... and sorting them from most to least amount of calories
    .sort((previousCalories, nextCalories) => nextCalories - previousCalories);
// Example: [ 900, 800, 600 ]

// Total the top 3 most amount of calories
const totalCaloriesOfTopThree = mostCalories + secondMostCalories + thirdMostCalories;
// Example: 2300

// Console log the most amount of calories...
console.log('Most calories:', mostCalories, '(Part 1)');
// ... and the total amount of calories of the top 3
console.log('Total calories of top 3:', totalCaloriesOfTopThree, '(Part 2)');
