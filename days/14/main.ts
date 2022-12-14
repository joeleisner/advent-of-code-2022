import { getAmountOfSettledSand, parseInput } from './mod.ts';

// Grab the input data
const input = await Deno.readTextFile(new URL('./input.txt', import.meta.url));

// Get the rock paths from the input data
const rockPaths = parseInput(input);

// Get the amount of settled sand before reaching the abyss
const amountOfSettledSandBeforeAbyss = getAmountOfSettledSand(rockPaths);

console.log(
    'Amount of settled sand (before abyss)',
    amountOfSettledSandBeforeAbyss,
    '(Part 1)',
);

// Get the amount of settled sand on the floor
const amountOfSettledSandOnFloor = getAmountOfSettledSand(rockPaths, true);

console.log(
    'Amount of settled sand (on floor)',
    amountOfSettledSandOnFloor,
    '(Part 2)',
);
