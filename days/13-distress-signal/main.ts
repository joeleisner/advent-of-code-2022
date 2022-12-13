import {
    getDecoderKey,
    getSumOfOrderedPacketPairIndices,
    parseInput,
} from './mod.ts';

// Grab the input data
const input = await Deno.readTextFile(new URL('./input.txt', import.meta.url));

// Get the packet pairs from the input data
const pairs = parseInput(input);

// Get the sum of the ordered pair indices
const sumOfOrderedPacketPairIndices = getSumOfOrderedPacketPairIndices(pairs);

console.log(
    'Sum of ordered packet pair indices',
    sumOfOrderedPacketPairIndices,
    '(Part 1)',
);

// Get the decoder key
const decoderKey = getDecoderKey(pairs);

console.log(
    'Decoder key',
    decoderKey,
    '(Part 2)',
);
