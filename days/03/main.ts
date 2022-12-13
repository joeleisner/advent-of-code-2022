import {
    getRucksackGroupBadgePrioritySum,
    getRucksackItemPrioritySum,
    parseInput,
} from './mod.ts';

// Grab the input data
const input = await Deno.readTextFile(new URL('./input.txt', import.meta.url));

// Get the rucksacks from the input data
const rucksacks = parseInput(input);

// Convert the rucksacks into the sum of their priority item type value
const rucksackItemPrioritySum = getRucksackItemPrioritySum(rucksacks);

console.log(
    'Sum of priority item types:',
    rucksackItemPrioritySum,
    '(Part 1)',
);

// Convert the rucksacks in groups of 3 into the sum of their priority item type value
const rucksackGroupBadgePrioritySum = getRucksackGroupBadgePrioritySum(
    rucksacks,
);

console.log(
    'Sum of priority item types:',
    rucksackGroupBadgePrioritySum,
    '(Part 2)',
);
