import {
    getSignalStrengthSum,
    parseInput,
    renderImage,
    renderScreen,
} from './mod.ts';

// Grab the input data
const input = await Deno.readTextFile(new URL('./input.txt', import.meta.url));

// Get the program instructions from the input data
const instructions = parseInput(input);

// Get the sum of signal strengths with the given program instructions
const signalStrengthSum = getSignalStrengthSum(instructions);

console.log('Sum of signal strengths:', signalStrengthSum, '(Part 1)');

const renderedImage = renderImage(instructions);

console.log('Rendered image:');
renderScreen(renderedImage);
console.log('(Part 2)');
