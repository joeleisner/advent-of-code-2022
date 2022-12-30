type Space = '#' | '.';

type Position<T extends number = number> = [x: T, y: T];

type PositionKey<T extends number = number> = `[${Position<T>[0]},${Position<
    T
>[1]}]`;

// Converts a position tuple to a position key
const positionAsKey = <T extends number = number>(position: Position<T>) =>
    JSON.stringify(position) as PositionKey<T>;

// Converts a position key to a position tuple
const keyAsPosition = <T extends number = number>(key: PositionKey<T>) =>
    JSON.parse(key) as Position<T>;

type Elves = Set<PositionKey>;

// Parses a set of elf position keys from the given input data
export const parseInput = (input: string) => {
    // Create a space matrix from the given input data...
    const matrix = input.split('\n').map((row) => row.split('') as Space[]);
    // ... and initialize a set of elf position keys
    const elves: Elves = new Set();

    // For each row...
    for (const [rowIndex, row] of matrix.entries()) {
        // ... and column:
        for (const [colIndex, column] of row.entries()) {
            // If it's an empty space, continue,...
            if (column === '.') continue;
            // ... otherwise, add the position key to the elves set
            elves.add(positionAsKey([colIndex, rowIndex]));
        }
    }

    // Finally, return the elves
    return elves;
};

// All ordinal directions
const ordinalDirections = ['NW', 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W'] as const;

type OrdinalDirection = typeof ordinalDirections[number];

type CardinalDirection = Extract<OrdinalDirection, 'N' | 'S' | 'W' | 'E'>;

type Delta = -1 | 0 | 1;

// All direction as position deltas
const directionDeltas: Record<OrdinalDirection, Position<Delta>> = {
    'NW': [-1, -1],
    'N': [0, -1],
    'NE': [1, -1],
    'E': [1, 0],
    'SE': [1, 1],
    'S': [0, 1],
    'SW': [-1, 1],
    'W': [-1, 0],
};

// Returns a partial record of available cardinal direction position keys the given elf can move to
const canMove = (
    elf: PositionKey,
    elves: Elves,
) => {
    // Get the X/Y of the given elf...
    const [x, y] = keyAsPosition(elf);
    // ... and grab all ordinal direction position keys the elf can move to
    const {
        NW,
        N,
        NE,
        E,
        SE,
        S,
        SW,
        W,
    } = Object.fromEntries(
        Object.entries(directionDeltas)
            .map(([ordinalDirection, [deltaX, deltaY]]) =>
                [
                    ordinalDirection as OrdinalDirection,
                    positionAsKey([deltaX + x, deltaY + y]),
                ] as const
            )
            .filter(([, key]) => !elves.has(key)),
    ) as Record<OrdinalDirection, PositionKey | undefined>;

    // Initialize a partial record of cardinal direction position keys
    const available: Partial<Record<CardinalDirection, PositionKey>> = {};

    // If the elf can move north, north-east, and north-west,...
    if (N && NE && NW) {
        // ... make the north position key available
        available.N = N;
    }

    // If the elf can move south, south-east, and south-west,...
    if (S && SE && SW) {
        // ... make the south position key available
        available.S = S;
    }

    // If the elf can move west, north-west, and south-west,...
    if (W && NW && SW) {
        // ... make the west position key available
        available.W = W;
    }

    // If the elf can move east, north-east, and south-east,...
    if (E && NE && SE) {
        // ... make the east position key avaialble
        available.E = E;
    }

    // Return the record of available cardinal direction position keys
    return available;
};

// Yields the elves position keys after moving over the courd of the given rounds
export const move = function* (elves: Elves, rounds = 10) {
    // Initialize an array of cardinal directions...
    const directions = ['N', 'S', 'W', 'E'] as CardinalDirection[];
    // ... and a map of next elf positions and their previous positions
    const nextPositions = new Map<PositionKey, PositionKey[]>();

    // While there are rounds left:
    while (rounds) {
        // For each elf:
        for (const elf of elves) {
            // Get its available cardinal direction moves...
            const moves = canMove(elf, elves);
            // ... and if all or none are available, continue to the next elf
            if (
                Object.keys(moves).length === 4 ||
                !Object.keys(moves).length
            ) continue;

            // Otherwise, for each direction:
            for (const direction of directions) {
                // See if the elf can move in that direction...
                const move = moves[direction];
                // ... and if it can't, continue to the next direction
                if (!move) continue;

                // Otherwise, add that move and the elf's current position to the next positions map...
                nextPositions.set(move, [
                    ...(nextPositions.get(move) || []),
                    elf,
                ]);
                // ... and break the loop
                break;
            }
        }

        // For each move and previous positions of the next positions map:
        for (const [move, positions] of nextPositions) {
            // If there are more than one previous position, do nothing
            if (positions.length !== 1) continue;

            // Otherwise, remove the previous position from...
            elves.delete(positions[0]);
            // ... and add the new move to the set of elves
            elves.add(move);
        }

        // Yield the elves
        yield elves;

        // Finally, clear out the next positions,...
        nextPositions.clear();
        // ... rotate the directions,...
        const direction = directions.shift()!;
        directions.push(direction);
        // ... and decrement the rounds
        rounds--;
    }
};

// Returns the amount of empty ground tiles of the given elves after moving them for the specified amount of rounds
export const getAmountOfEmptyGroundTiles = (
    elves: Elves,
    rounds?: number,
) => {
    // Get the final set of elf positions after moving them for the specified amount of rounds,...
    const finalElves = [...move(elves, rounds)].pop()!;
    // ... convert them to an array of positions,...
    const finalPositions = [...finalElves].map((key) => keyAsPosition(key));
    // ... and pull the Y...
    const finalYs = finalPositions.map(([, y]) => y);
    // ... and X values from them
    const finalXs = finalPositions.map(([x]) => x);

    // Get the minimum Y,...
    const minY = Math.min(...finalYs);
    // ... maximum Y,...
    const maxY = Math.max(...finalYs);
    // ... minimum X,...
    const minX = Math.min(...finalXs);
    // ... and maximum X values
    const maxX = Math.max(...finalXs);

    // Initialize the amount of empty ground tiles
    let empty = 0;

    // For each row...
    for (let y = minY; y <= maxY; y++) {
        // ... and column index:
        for (let x = minX; x <= maxX; x++) {
            // Attempt to get an elf at the current position...
            const elf = finalPositions.find(([elfX, elfY]) =>
                elfX === x && elfY === y
            );
            // ... and if it exists, continue
            if (elf) continue;

            // Otherwise, increment the amount of empty ground tiles
            empty++;
        }
    }

    // Finally, return the amount of empty ground tiles
    return empty;
};
