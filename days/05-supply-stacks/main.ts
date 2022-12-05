import { parseInput, rearrangedTopCrates } from './mod.ts';

// Grab the input data
const input = await Deno.readTextFile(new URL('./input.txt', import.meta.url));

// Get the crates and instructions from the formatted input data
const [
    crates,
    instructions
] = parseInput(input);

// Get the top crates after rearranging (CrateMover 9000: Indivudal)
const firstRearrangedTopCrates = rearrangedTopCrates(
    crates,
    instructions
);

console.log('Individually rearranged top crates:', firstRearrangedTopCrates, '(Part 1)');

// Get the top crates after rearranging (CrateMover 9001: Grouped)
const secondRearrangedTopCrates = rearrangedTopCrates(
    crates,
    instructions,
    false
);

console.log('Multple rearranged top crates:', secondRearrangedTopCrates, '(Part 2)');
