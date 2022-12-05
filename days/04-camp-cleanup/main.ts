import {
    onlyContainedPairs,
    onlyOverlappingPairs,
    parseInput
} from './mod.ts';

// Grab the input data
const input = await Deno.readTextFile(new URL('./input.txt', import.meta.url));

// Get the assignment pairs from the input data
const assignmentPairs = parseInput(input);

// The amount of fully contained assignment pairs
const containedPairsAmount = assignmentPairs
    // 1. Filter out only contained assignment pairs
    .filter(onlyContainedPairs)
    // 2. Return the length of the array
    .length;

console.log('Fully contained pairs:', containedPairsAmount, '(Part 1)');

// The amount of overlapping assignment pairs
const overlappingPairsAmount = assignmentPairs
    // 1. Filter out only overlapping assignment pairs
    .filter(onlyOverlappingPairs)
    // 2. Return the length of the array
    .length;

console.log('Overlapping pairs:', overlappingPairsAmount, '(Part 2)');
