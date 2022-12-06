// Rotates a string matrix clockwise
const rotate = (matrix: string[][]) => (
    matrix[0].map((_column, columnItem) => (
        matrix.map((_row, rowItem) => (
            matrix[rowItem][columnItem]
        )).reverse()
    ))
);

type Crates = string[][];

// Convert the crates into a matrix of character strings
const parseCrates = (crates: string) => {
    const matrix = crates
        // 1. Split the crates by every new line
        .split('\n')
        // 2. Remove the stack numbers
        .slice(0, -1)
        // 3. Convert the stacks into arrays of characters or empty strings
        .map((stacks) => (
            stacks.match(/.{1,4}/g)?.map((crate) => (
                (crate.match(/\w/g) || [])[0] || '' as string
            )) as string[]
        ));

    // Return the matrix rotated 90 degrees (so each array is a stack from bottom to top)
    return rotate(matrix)
        // 1. Remove empty values from the stack
        .map((stack) => stack.filter(Boolean)) as Crates;
};

type Instruction = [
    quantity: number,
    from: number,
    to: number,
];

type Instructions = Instruction[];

// Convert instructions string to an array of instruction tuples
const parseInstructions = (instructions: string) => {
    return instructions
        // 1. Split the instructions by every new line
        .split('\n')
        // 2. Match the numbers from each instruction into a tuple
        .map((instruction) => (
            instruction.match(/\d+/g)
                ?.map(Number)
                // 2.1. Convert quantity to a negative number, and from/to to a zero-based index
                .map((action, index) => (
                    !index ? action * -1 : action - 1
                ))
        )) as Instructions;
};

// Formats the data into crates and instructions
export const parseInput = (input: string) => (
    input
        .split('\n\n')
        .map((input: string, index: number) => (
            !index ? parseCrates(input) : parseInstructions(input)
        )) as [Crates, Instructions]
);

// Rearrange the given crates with the given instructions
export const rearrangedTopCrates = (
    crates: Crates,
    instructions: Instructions,
    individually = true,
) => {
    // Ensure the crates are a copy of the original
    crates = [...crates];

    // For each quantity, from, and to of each instruction:
    for (const [quantity, from, to] of instructions) {
        // 1. Grab the crates to be moved
        let cratesToMove = crates[from].slice(quantity);
        // 2. If crates are to be moved individually, reverse the crates to be moved
        if (individually) cratesToMove = cratesToMove.reverse();
        // 2. Remove them from the "from" stack
        crates[from] = crates[from].slice(0, quantity);
        // 3. Move them to the "to" stack
        crates[to] = [...crates[to], ...cratesToMove];
    }

    // Finally, return the rearranged crates
    return crates
        .map((stack) => stack.at(-1))
        .join('');
};
