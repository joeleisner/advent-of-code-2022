import { getFewestSteps, parseInput } from './mod.ts';

// Grab the input data
const input = await Deno.readTextFile(new URL('./input.txt', import.meta.url));

// Get the map instructions from the input data
const { map, start, end } = parseInput(input);

// Get the fewest number of steps from start to end
const fewestStepsFromStartToEnd = getFewestSteps(
    map,
    start,
    end,
);

console.log(
    'Fewest steps (start to end)',
    fewestStepsFromStartToEnd,
    '(Part 1)',
);

// Get the fewest number of steps from end to the lowest height
const fewestStepsFromLowestToEnd = getFewestSteps(
    map,
    end,
    1,
);

console.log(
    'Fewest steps (end to lowest)',
    fewestStepsFromLowestToEnd,
    '(Part 2)',
);
