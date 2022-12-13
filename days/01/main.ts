import { parseInput, topCalories } from './mod.ts';

// Grab the input data
const input = await Deno.readTextFile(new URL('./input.txt', import.meta.url));

// Get the calorie matrix from the input data
const calorieMatrix = parseInput(input);

// Grab the top 3 most amount of calories from the calorie matrix
const [
    mostCalories,
    secondMostCalories,
    thirdMostCalories,
] = topCalories(calorieMatrix);

// Total the top 3 most amount of calories
const totalCaloriesOfTopThree = mostCalories + secondMostCalories +
    thirdMostCalories;

// Console log the most amount of calories...
console.log('Most calories:', mostCalories, '(Part 1)');
// ... and the total amount of calories of the top 3
console.log('Total calories of top 3:', totalCaloriesOfTopThree, '(Part 2)');
