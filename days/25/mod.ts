// The possible SNAFU digits
const SNAFUDigits = ['2', '1', '0', '-', '='] as const;

type SNAFUDigit = typeof SNAFUDigits[number];

// A record of SNAFU digits and their values
const SNAFUDecimalValues: Record<SNAFUDigit, number> = {
    '2': 2,
    '1': 1,
    '0': 0,
    '-': -1,
    '=': -2,
};

import { sum } from '@lib/math.ts';

// Converts a SNAFU number string to a decimal number
const SNAFUToDecimal = (input: string) => (
    (input.split('') as SNAFUDigit[])
        .reverse()
        .map((digit, index) =>
            SNAFUDecimalValues[digit] * (index ? Math.pow(5, index) : 1)
        )
        .reduce(sum)
);

type SNAFUConversion = [digit: SNAFUDigit, add?: number];

// A record of decimal/SNAFU conversions
const decimalSNAFUConversions: Record<number, SNAFUConversion> = {
    0: ['0'],
    1: ['1'],
    2: ['2'],
    3: ['=', 2],
    4: ['-', 1],
};

// Converts a given decimal number to a SNAFU number string
const decimalToSNAFU = (number: number): string => {
    // If there's no number, return an empty string
    if (!number) return '';

    // Grab the...
    const [
        // ... SNAFU digit...
        digit,
        // ... and optional additon...
        add = 0,
        // ... from the conversions
    ] = decimalSNAFUConversions[number % 5];

    // Recurse
    return decimalToSNAFU(Math.floor((number + add) / 5)) + digit;
};

// Grab the decimal numbers from the given input data
export const parseInput = (input: string) => (
    input.split('\n').map((line) => SNAFUToDecimal(line))
);

type Numbers = ReturnType<typeof parseInput>;

// Sums the given numbers and returns it as a SNAFU number string
export const getSumAsSNAFU = (numbers: Numbers) => (
    decimalToSNAFU(numbers.reduce(sum))
);
