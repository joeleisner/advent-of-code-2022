import { getFinalPassword, parseInput } from './mod.ts';

// Grab the input data
const input = await Deno.readTextFile(new URL('./input.txt', import.meta.url));

// Parse the state from the input data
const state = parseInput(input);

// Get the final password
const finalPassword = getFinalPassword(state);

console.log(
    'Final password',
    finalPassword,
    '(Part 1)',
);
