// type MonkeyName =

// type Operand = string | number;

// The possible mathemtical operation symbols that can be used by a monkey
const operationSymbols = ['+', '-', '*', '/'] as const;

type OperationSymbol = typeof operationSymbols[number];

type Math = [
    leftName: string,
    operationSymbol: OperationSymbol,
    rightName: string,
];

type Yell = number | Math;

type MonkeyEntry = [name: string, yell: Yell];

type Monkeys = Map<MonkeyEntry[0], MonkeyEntry[1]>;

// Parses a map of monkey names and what they yell from the given input data
export const parseInput = (input: string) => {
    // Get entries of monkeys...
    const entries = input.split('\n').map((line) => {
        // Grab the name and yell (raw) from the line
        const [name, rawYell] = line.split(': ');

        // Initialize a yell...
        let yell: Yell;
        // ... and get its pieces
        const [
            numberOrLeftOperand,
            operation,
            rightOperand,
        ] = rawYell.split(' ');

        // If there's only one item in yell,...
        if (!operation && !rightOperand) {
            // ... assign is as a number,...
            yell = Number(numberOrLeftOperand);
        } else {
            // ... otherwise, assign it as a mathematical operation
            yell = [numberOrLeftOperand, operation, rightOperand] as Math;
        }

        // Finally, return the monkey as an entry
        return [name, yell] as MonkeyEntry;
    });
    // ... and return a new monkey map from it
    return new Map(entries) as Monkeys;
};

type OperationFunction = (a: number, b: number) => number;

import { divide, multiply, subtract, sum } from '@lib/math.ts';

// The possible mathematical operations that can be done by a monkey
const operations: Record<OperationSymbol, OperationFunction> = {
    '+': sum,
    '-': subtract,
    '*': multiply,
    '/': divide,
};

type NumberComparison = [left: number, right: number];

type NumberResult = [result: number, comparison: NumberComparison];

// Returns the number yelled by a given monkey name within the given monkeys
export const getNumber = (
    monkeys: Monkeys,
    name = 'root',
): NumberResult => {
    // Get the yell of the given monkey's name...
    const yell = monkeys.get(name)!;
    // ... and if it's a number, return it with an empty comparison
    if (typeof yell === 'number') return [yell, [0, 0]];

    // Otherwise, get the...
    const [
        // ... left name,...
        leftName,
        // ... operation symbol,...
        operationSymbol,
        // ... and right name...
        rightName,
        // ... from the yell math
    ] = yell;

    // Get the left...
    const [leftYell] = getNumber(monkeys, leftName);
    // ... and right yell numbers
    const [rightYell] = getNumber(monkeys, rightName);

    // Otherwise, grab the operation...
    const operation = operations[operationSymbol];
    // ... and get its result
    const result = [leftYell, rightYell].reduce(operation);

    // Finally, return the result and comparison
    return [result, [leftYell, rightYell]];
};

type NumberRange = [low: number, high: number];

type ComparisonFunction = (a: number, b: number) => boolean;

// Returns your number to make the "root" monkey's comparison true
export const getYourNumber = (
    monkeys: Monkeys,
    range: NumberRange = [0, 10_000_000_000_000],
    compare: ComparisonFunction = (a: number, b: number) => a < b,
) => {
    // Clone the monkeys...
    monkeys = new Map(monkeys);
    // ... and the initial range
    const initialRange = [...range] as NumberRange;

    // While the correct number has not been found:
    while (range[0] !== range[1]) {
        // Get a number in the middle of the range...
        const number = Math.trunc(range.reduce(sum) / 2);
        // ... and make it your number
        monkeys.set('humn', number);

        // Get the left/right values of the "root" monkey...
        const [
            ,
            [
                leftYell,
                rightYell,
            ],
        ] = getNumber(monkeys);
        // ... and if they equal each other, return the number
        if (leftYell === rightYell) return number;

        // If the left yell is negative,...
        if (leftYell < 0) {
            // ... reset the range...
            range = initialRange;
            // ... and invert the comparison function
            compare = (a: number, b: number) => a > b;
        }

        // Adjust the low/high values of the range based on the number
        range[compare(leftYell, rightYell) ? 0 : 1] = number;
    }

    // If all else fails, return not a number
    return NaN;
};
