export interface Monkey {
    items: number[];
    operation: (item: number) => number;
    test: [divisibleBy: number, true: number, false: number];
    inspected: number;
}

// Parse integers from a given string
const parseIntegers = (input: string) =>
    [...input.matchAll(/\d+/g)].map(Number);

// Creates a monkey operation function
const createOperation = (line: string): Monkey['operation'] => {
    // Get the operation from the given line
    const operation = line.split(' = ')![1];

    // If it's square operation,...
    if (operation === 'old * old') {
        // ... return the appropriate function
        return (item: number) => item * item;
    }

    // Grab the amount from the operation
    const amount = parseIntegers(operation)[0];

    // If it's a multiplication operation,...
    if (operation.startsWith('old * ')) {
        // ... return the appropriate function
        return (item: number) => item * amount;
    }

    // If it's an addition operation,...
    if (operation.startsWith('old + ')) {
        // ... return the appropriate function
        return (item: number) => item + amount;
    }

    // If all else fails, return a function that does no math
    return (item: number) => item;
};

// Creates a monkey object from the given lines
const createMonkey = ([
    rawItems,
    rawOperation,
    rawTestDivisibleBy,
    rawTestTrue,
    rawTestFalse,
]: string[]): Monkey => {
    // Grab the items,...
    const items = parseIntegers(rawItems);
    // ... operation,...
    const operation = createOperation(rawOperation);
    // ... and test data from the given lines
    const test = [
        parseIntegers(rawTestDivisibleBy)[0],
        parseIntegers(rawTestTrue)[0],
        parseIntegers(rawTestFalse)[0],
    ] as Monkey['test'];

    // Initialize an inspected number as zero...
    const inspected = 0;
    // ... and return the monkey object
    return {
        items,
        operation,
        test,
        inspected,
    };
};

// Parse the monkeys from the given input data
export const parseInput = (input: string) => (
    input
        .split('\n\n')
        .map((data) => createMonkey(data.split('\n').slice(1)))
);

// Clones a given monkey
const cloneMonkey = (
    { items, operation, test, inspected }: Monkey,
): Monkey => ({
    items: [...items],
    operation,
    test: [...test],
    inspected,
});

// Clones a given array of monkeys
const cloneMonkeys = (monkeys: Monkey[]) => [...monkeys].map(cloneMonkey);

// Run through the specified amount of rounds for each monkey
const runRounds = (
    monkeys: Monkey[],
    rounds = 20,
    worryLevelModulus = 0,
) => {
    // Make sure we're not dealing with the initial monkey state
    monkeys = cloneMonkeys(monkeys);

    // For each round,...
    for (let round = 0; round < rounds; round++) {
        // ... each monkey,...
        for (const monkey of monkeys) {
            // ... and each monkey's items:
            while (monkey.items.length) {
                // Grab the next item (worry level),...
                let item = monkey.items.shift()!;
                // ... inspect it,...
                item = monkey.operation(item);
                // ... and mark it as inspected
                monkey.inspected++;

                // If a worry level modulus was provided,...
                item = worryLevelModulus
                    // ... use it for the item's new bored worry level,...
                    ? item % worryLevelModulus
                    // ... otherwise divide it by 3 (rounded down)
                    : Math.floor(item / 3);

                // Grab the...
                const [
                    // ... divisible-by value,...
                    divisibleBy,
                    // ... true monkey index,...
                    trueMonkeyIndex,
                    // ... and false monkey index
                    falseMonkeyIndex,
                ] = monkey.test;

                // Get the monkey to throw to after testing it
                const monkeyToThrowTo = monkeys[
                    item % divisibleBy === 0
                        ? trueMonkeyIndex
                        : falseMonkeyIndex
                ];

                // Throw the item to the specified monkey
                monkeyToThrowTo.items.push(item);
            }
        }
    }

    // Finally, return the monkeys
    return monkeys;
};

import { multiply } from '@lib/math.ts';

// Gets a worry level modulus to use from the given monkeys
export const getWorryLevelModulus = (monkeys: Monkey[]) =>
    monkeys.map(({ test }) => test[0]).reduce(multiply);

import { descending } from '@lib/sort.ts';

// Returns the monkey business of...
export const getMonkeyBusiness = (
    // ... the given monkeys...
    monkeys: Monkey[],
    // ... for the specified amount of rounds...
    rounds?: number,
    // ... using the provided modulus operator
    modulus?: number,
) => {
    // Get the results after the specified amount of rounds
    const result = runRounds(monkeys, rounds, modulus);

    // Return the result...
    return result
        // 1. As inspected values only
        .map(({ inspected }) => inspected)
        // 2. Sorted in descending (largest to smallest) order
        .sort(descending)
        // 3. The top 2 inspected values
        .slice(0, 2)
        // 4. Everything multiplied together
        .reduce(multiply);
};
