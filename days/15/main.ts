import {
    getAvailablePositions,
    getTuningFrequencyOfDistressSignal,
    parseInput,
} from './mod.ts';

// Grab the input data
const input = await Deno.readTextFile(new URL('./input.txt', import.meta.url));

// An array of sensors, their beacon, and their range, from the input data
const sensors = parseInput(input);

// Get the amount of available positions (not containing a beacon) at Y=2,000,000
const availablePositions = getAvailablePositions(sensors, 2_000_000);

console.log(
    'Available positions',
    availablePositions,
    '(Part 1)',
);

// Get the tuning frequency of a found distress signal
const tuningFrequency = getTuningFrequencyOfDistressSignal(sensors, 4_000_000);

console.log(
    'Tuning frequency of distress signal',
    tuningFrequency,
    '(Part 2)',
);
