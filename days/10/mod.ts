type InstructionName = 'noop' | 'addx';

type RawInstruction = [name: InstructionName, value?: number];

type Instruction = [cycles: number, value: number];

// The number of cyles the instructions take
const cycles = {
    noop: 1,
    addx: 2,
};

// Parses the program instructions from the given input data
export const parseInput = (input: string) => (
    input
        .split('\n')
        .map((line) => {
            const [instruction, value] = line.split(' ') as RawInstruction;
            return [cycles[instruction], Number(value) || 0] as Instruction;
        })
);

// Run the program from the given instructions
function* runProgram(instructions: Instruction[]) {
    // To start, set the X register to 1...
    let x = 1;
    // ... and the current cycle to 0
    let currentCycle = 0;

    // For each instruction:
    for (const [cycles, value] of instructions) {
        // Run through its cycles,...
        for (let cycle = 0; cycle < cycles; cycle++) {
            // ... incrementing the current cycle...
            currentCycle++;
            // ... and yielding the current cycle and X register
            yield [currentCycle, x];
        }

        // After the cycles are complete, update the X register
        x += value;
    }
}

import { sum } from '@lib/math.ts';

// Returns the sum of signal strengths of a given program at the given cycles
export const getSignalStrengthSum = (
    instructions: Instruction[],
    cycles: Set<number> = new Set([20, 60, 100, 140, 180, 220]),
) => {
    // Initialize the signal strengths as a map
    const signalStrengths = new Map<number, number>();

    // For each cycle of the running program,...
    for (const [cycle, x] of runProgram(instructions)) {
        // ... if the current cycle is one to check, add its signal strength to the map
        if (cycles.has(cycle)) signalStrengths.set(cycle, cycle * x);
    }

    // Finally, return all signal strengths summed together
    return [...signalStrengths.values()].reduce(sum);
};

type Pixel = '#' | '.';

// Creates a set of possible sprite positions based on the given X register value
const spritePosition = (x: number) => new Set([x - 1, x, x + 1]);

type Screen = Array<Pixel[]>;

// Creates a screen of a given width and height
const createScreen = (width = 40, height = 6) => {
    // Creates a matrix of pixels of the given width and height
    const screen: Screen = [
        ...Array(height).fill(0).map((_) => [
            ...Array(width).fill('.'),
        ]),
    ];

    // Updates a screen pizel based on the given cycle and X register value
    const update = (cycle: number, x: number) => {
        // Grab the index...
        const index = cycle - 1;
        // ... of the row...
        const row = Math.floor(index / width);
        // ... and column to draw
        const column = index % width;

        // Get a lit/dim pixel depending on if the column is within the sprite's position...
        const pixel = spritePosition(x).has(column) ? '#' : '.';
        // ... and draw it to the screen
        screen[row][column] = pixel;
    };

    // Finally, return the screen and its update function
    return [screen, update] as const;
};

// Render an image to a screen from the given program instructions
export const renderImage = (instructions: Instruction[]) => {
    // Create a screen and its update function
    const [screen, updateScreen] = createScreen();

    // For each cycle of the running program,...
    for (const [cycle, x] of runProgram(instructions)) {
        // ... update the screen based on the cycle and the X register value
        updateScreen(cycle, x);
    }

    // Finally return the screen
    return screen;
};

import { dim, green } from 'std/fmt/colors.ts';

// Render a given screen to the console
export const renderScreen = (screen: Screen) => {
    // Get the width of the given screen...
    const width = screen[0].length;
    // ... and create a horiztonal border using it
    const horizontalBorder = Array(width).fill('─');

    // Draw the top border of the screen
    console.log(['┌', ...horizontalBorder, '┐'].map(dim).join(''));

    // For each row of the screen, draw it
    for (const row of screen) {
        console.log(
            [
                dim('│'),
                ...row.map((pixel) =>
                    pixel === '#' ? green(pixel) : dim(pixel)
                ),
                dim('│'),
            ].join(''),
        );
    }

    // Draw the bottom border of the screen
    console.log(['└', ...horizontalBorder, '┘'].map(dim).join(''));
};
