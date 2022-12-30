import { getAmountOfEmptyGroundTiles, parseInput } from './mod.ts';

// Grab the input data
const input = await Deno.readTextFile(new URL('./input.txt', import.meta.url));

// Parse the elves from the input data
const elves = parseInput(input);

// The amount of empty ground tiles after moving the elves for 10 rounds
const emptyGroundTiles = getAmountOfEmptyGroundTiles(elves, 10);

console.log(
    'Amount of empty ground tiles:',
    emptyGroundTiles,
    '(Part 1)',
);
