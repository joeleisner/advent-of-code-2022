import { getSumAsSNAFU, parseInput } from './mod.ts';

// Grab the input data
const input = await Deno.readTextFile(new URL('./input.txt', import.meta.url));

// The numbers from the input data
const numbers = parseInput(input);

// Get the sum of numbers as a SNAFU string
const SNAFUSum = getSumAsSNAFU(numbers);

console.log(
    'SNAFU sum:',
    SNAFUSum,
    '(Part 1)',
);
