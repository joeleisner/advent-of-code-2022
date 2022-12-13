import { getAmountOfUniqueTailPositions, parseInput } from './mod.ts';

// Grab the input data
const input = await Deno.readTextFile(new URL('./input.txt', import.meta.url));

// Get the rope knot movements from the input data
const movements = parseInput(input);

// The amount of unique 2-knot tail positions after the given set of movements
const uniqueTailPositionsOfTwoKnots = getAmountOfUniqueTailPositions(movements);

console.log(
    'Amount of unique tail positions (2 knots):',
    uniqueTailPositionsOfTwoKnots,
    '(Part 1)',
);

// The amount of unique 10-knot tail positions after the given set of movements
const uniqueTailPositionsOfTenKnots = getAmountOfUniqueTailPositions(
    movements,
    10,
);

console.log(
    'Amount of unique tail positions (10 knots):',
    uniqueTailPositionsOfTenKnots,
    '(Part 2)',
);
