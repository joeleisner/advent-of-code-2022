// Parses an array of numbers from the given input data
export const parseInput = (input: string) => (
    input.split('\n').map(Number)
);

// The decryption key to multiply the numbers by
const decryptionKey = 811_589_153;

// Mix the numbers to be in the correct order
const mix = (numbers: number[], decrypt = false) => {
    // If the input is encrypted,...
    if (decrypt) {
        // ... multiply the numbers by the decryption key...
        numbers = numbers.map((number) => number * decryptionKey);
    }
    // ... and mix 10 times (as opposed to just once)
    let times = decrypt ? 10 : 1;

    // Copy the numbers (and their indices) as keys...
    const keys = [...numbers.entries()];
    // ... and the new mixed array
    const mixed = [...keys];

    // For each time...
    while (times) {
        // ... and each ID (index) and value of the keys:
        for (const [id, value] of keys) {
            // If the value is zero, continue
            if (!value) continue;

            // Find the index of the current ID/value pair in the mixed array,...
            const index = mixed.findIndex(([i, v]) => i === id && v === value);
            // ... remove it,...
            mixed.splice(index, 1);
            // ... and place it at its new position
            mixed.splice((index + value) % mixed.length, 0, [
                id,
                value,
            ]);
        }
        // Decrement the amount of times to mix
        times--;
    }

    // Finally, return just the values of the mixed array
    return mixed.map(([, value]) => value);
};

import { sum } from '@lib/math.ts';

// Get the grove coordinates (encrypted or decrypted) from the given numbers
export const getGroveCoordinates = (
    numbers: number[],
    decrypt?: boolean,
) => {
    // Get the mixed numbers...
    const mixed = mix(numbers, decrypt);
    // ... and grab the index of its zero item
    const index = mixed.indexOf(0);

    // Finally, return the...
    return [
        // ...thousandth,...
        mixed[(index + 1_000) % mixed.length],
        // ... two-thousandth,...
        mixed[(index + 2_000) % mixed.length],
        // ... and three-thousandth values,...
        mixed[(index + 3_000) % mixed.length],
        // ... added together
    ].reduce(sum);
};
