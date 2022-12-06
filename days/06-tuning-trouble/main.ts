import {
    parseInput,
    getStartOfMessageMarker,
    getStartOfPacketMarker
} from './mod.ts';

// Grab the input data
const input = await Deno.readTextFile(new URL('./input.txt', import.meta.url));

// Get the data stream from the input data
const datastream = parseInput(input);

// Get the start-of-packet marker from the data stream
const startOfPacketMarker = getStartOfPacketMarker(datastream);

console.log('Start-of-packet marker:', startOfPacketMarker, '(Part 1)');

// Get the start-of-message marker from the data stream
const startOfMessageMarker = getStartOfMessageMarker(datastream);

console.log('Start-of-message marker:', startOfMessageMarker, '(Part 2)');
