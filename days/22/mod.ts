type Position<T = number> = [x: T, y: T];

// The types of spaces available on a map
const spaces = [' ', '.', '#'] as const;

type Space = typeof spaces[number];

type Map = Space[][];

// Parse the given map input
const parseMap = (mapInput: string) => {
    // Grab the lines of the map...
    const lines = mapInput.split('\n');
    // ... and the length of the longest one
    const width = Math.max(...lines.map((line) => line.length));

    // Get the starting position of the player...
    const position = [lines[0].indexOf('.'), 0] as Position;
    // ... and the map from the lines...
    const map = lines.map((line) => {
        const spaces = line.split('');
        const remainder = new Array(width - line.length).fill(' ');
        // ... as an array of spaces with its width normalized
        return [...spaces, ...remainder];
    }) as Map;

    // Return the start/map
    return [position, map] as const;
};

// The types of rotations you can make
const rotations = ['R', 'L'] as const;

type Rotation = typeof rotations[number];

type Instruction = [amount: number, rotation?: Rotation];

// Parse the given instructions input
const parseInstructions = (instructionsInput: string) => (
    [
        ...instructionsInput.matchAll(/(\d+)(\w?)/g),
    ].map(([, amount, rotation]) =>
        [Number(amount), rotation].filter(Boolean) as Instruction
    )
);

// Parse the map/instructions from the given input data
export const parseInput = (input: string) => {
    // Grab the map/instructions inputs from the given input data...
    const [mapInput, instructionsInput] = input.split('\n\n');
    // ... and parse the starting position, map,...
    const [position, map] = parseMap(mapInput);
    // ... and instructions from them
    const instructions = parseInstructions(instructionsInput);

    // Return everything as a state object
    return {
        position,
        map,
        instructions,
    };
};

type State = ReturnType<typeof parseInput>;

// The possible directions you can face
const faces = ['U', 'D', ...rotations] as const;

type Face = typeof faces[number];

// The possible directional deltas you can have
const deltas = [-1, 0, 1] as const;

type Delta = typeof deltas[number];

// The possible directions you can go in
const directions: Record<Face, Position<Delta>> = {
    U: [0, -1],
    D: [0, 1],
    L: [-1, 0],
    R: [1, 0],
};

// The possible directions you can turn to
const turns: Record<Face, Record<Rotation, Face>> = {
    U: { L: 'L', R: 'R' },
    R: { L: 'U', R: 'D' },
    D: { L: 'R', R: 'L' },
    L: { L: 'D', R: 'U' },
};

// Returns the next possible position based on the given position and direction faced
const getNextPosition = (
    [x, y]: Position,
    facing: Face,
): Position => {
    const [deltaX, deltaY] = directions[facing];
    return [x + deltaX, y + deltaY];
};

// Returns whether the given position on the map can be wrapped from
const canWrapFrom = (map: Map, ...position: Position) => (
    [' ', undefined].includes(map.at(position[1])?.at(position[0]))
);

// Returns the wrap around position based on the given position and direction faced
const getWrapAroundPosition = (
    [x, y]: Position,
    facing: Face,
    map: Map,
): Position => {
    // Initialize a new X...
    let newX = x;
    // ... and new Y (defaulting to the original X/Y values)
    let newY = y;
    // If facing...
    switch (facing) {
        // ... up:
        case 'U':
            // Find the Y of the last row with an available space at the current column...
            newY = map.findLastIndex((y) => y[x] === '.');
            // ... and if it can't be wrapped to, keep Y as-is
            if (!canWrapFrom(map, x, newY + 1)) newY = y;
            break;
        // ... right:
        case 'R':
            // Find the X of the first column with an available space at the current row...
            newX = map[y].indexOf('.');
            // ... and if it can't be wrapped to, keep X as-is
            if (!canWrapFrom(map, newX - 1, y)) newX = x;
            break;
        // ... down:
        case 'D':
            // Find the Y of the first row with an available space at the current column...
            newY = map.findIndex((y) => y[x] === '.');
            // ... and if it can't be wrapped to, keep Y as-is
            if (!canWrapFrom(map, x, newY - 1)) newY = y;
            break;
        // ... left:
        case 'L':
            // Find the X of the last column with an available space at the current row...
            newX = map[y].lastIndexOf('.');
            // ... and if it can't be wrapped to, keep X as-is
            if (!canWrapFrom(map, newX + 1, y)) newX = x;
            break;
    }

    // Finally, return the new X/Y position
    return [newX, newY];
};

// Yields your position and faced direction for each instruction of the given state
const step = function* (
    { position, map, instructions }: State,
) {
    // Initialize the direction you're facing (default: right)
    let facing: Face = 'R';

    // For each instruction's step amount and rotation:
    for (const [amount, rotation] of instructions) {
        steps:
        // For each step:
        for (let step = 0; step < amount; step++) {
            // Get the next possible position X/Y...
            const [nextX, nextY] = getNextPosition(position, facing);
            // ... and see what space is there on the map
            // const nextSpace = map[nextY][nextX];
            const nextSpace = map.at(nextY)?.at(nextX);

            // If the space is:
            switch (nextSpace) {
                // A rock,...
                case '#':
                    // ... you're stuck until you rotate
                    break steps;
                // A void,...
                case ' ':
                case undefined:
                    // ... attempt to wrap around...
                    position = getWrapAroundPosition(
                        position,
                        facing,
                        map,
                    );
                    // ... and go to the next step
                    continue steps;
                // An available space,...
                default:
                    // ... update your position
                    position = [nextX, nextY];
            }
        }

        // If there's instruction to rotate, change the direction you're facing
        if (rotation) facing = turns[facing][rotation];

        // Finally, yield your position and faced direction
        yield [position, facing] as const;
    }
};

// Returns the given Y's row value
const getRowValue = (y: Position[1]) => (y + 1) * 1000;

// Returns the given X's column value
const getColumnValue = (x: Position[0]) => (x + 1) * 4;

// The values assigned to each faced direction
const faceValues: Record<Face, number> = {
    U: 3,
    R: 0,
    D: 1,
    L: 2,
};

// Returns the final password of the given state
export const getFinalPassword = (state: State) => {
    // Get your X/Y position and face direction after all steps...
    const [[x, y], facing] = [...step(state)].pop()!;
    // ... and return the total values of them
    return getRowValue(y) + getColumnValue(x) + faceValues[facing];
};
