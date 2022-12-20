import { getGroveCoordinates, parseInput } from './mod.ts';

// Grab the input data
const input = await Deno.readTextFile(new URL('./input.txt', import.meta.url));

// An array of numbers from the input data
const numbers = parseInput(input);

// Get the encrypted grove coordinates from the array of numbers
const encryptedGroveCoordinates = getGroveCoordinates(numbers);

console.log(
    'Grove coordinates (encrypted):',
    encryptedGroveCoordinates,
    '(Part 1)',
);

// Get the decrypted grove coordinates from the array of numbers
const decryptedGroveCoordinates = getGroveCoordinates(numbers, true);

console.log(
    'Grove coordinates (decrypted):',
    decryptedGroveCoordinates,
    '(Part 2)',
);
