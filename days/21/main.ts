import { getNumber, getYourNumber, parseInput } from './mod.ts';

// Grab the input data
const input = await Deno.readTextFile(new URL('./input.txt', import.meta.url));

// Parse the monkeys from the input data
const monkeys = parseInput(input);

// Get the number yelled by root
const [rootNumber] = getNumber(monkeys);

console.log(
    'Number yelled by "root"',
    rootNumber,
    '(Part 1)',
);

const yourNumber = getYourNumber(monkeys);

console.log(
    'Your number to yell',
    yourNumber,
    '(Part 2)',
);
