import { getMonkeyBusiness, getWorryLevelModulus, parseInput } from './mod.ts';

// Grab the input data
const input = await Deno.readTextFile(new URL('./input.txt', import.meta.url));

// Get the monkeys from the input data
const monkeys = parseInput(input);

// Get the monkey business after 20 rounds
const monkeyBusinessAfterTwentyRounds = getMonkeyBusiness(monkeys);

console.log(
    'Monkey business after 20 rounds:',
    monkeyBusinessAfterTwentyRounds,
    '(Part 1)',
);

// Get the worry level modulus from the given monkeys...
const worryLevelModulus = getWorryLevelModulus(monkeys);
// ... and use it to get the monkey business after 10,000 rounds
const monkeyBusinessAfterTenThousandRounds = getMonkeyBusiness(
    monkeys,
    10_000,
    worryLevelModulus,
);

console.log(
    'Monkey business after 10,000 rounds:',
    monkeyBusinessAfterTenThousandRounds,
    '(Part 2)',
);
