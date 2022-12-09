type DirectionSymbol = 'L' | 'U' | 'R' | 'D';

type DirectionValue = -1 | 0 | 1;

type Direction = [x: DirectionValue, y: DirectionValue];

type Movement = [...direction: Direction, amount: number];

// Converts a direction symbol into a direction number tuple
const parseDirection = (direction: DirectionSymbol) =>
    [
        !['L', 'R'].includes(direction) ? 0 : direction === 'L' ? -1 : 1,
        !['D', 'U'].includes(direction) ? 0 : direction === 'D' ? -1 : 1,
    ] as Direction;

// Parses the rope knot movements from the given input data
export const parseInput = (input: string) => (
    // Return the input data...
    input
        // 1. Split into individual lines
        .split('\n')
        // 2. Each line split into a direction/amount
        .map((line) => line.split(' '))
        // 3. Direction/amount converted into the proper values
        .map((
            [direction, amount],
        ) => [
            // a. Direction as a number tuple
            ...parseDirection(direction as DirectionSymbol),
            // b. Amount as a number
            Number(amount),
        ]) as Movement[]
);

type Point = [x: number, y: number];

// Creates a head knot that can move
const createHead = (head: Point = [0, 0]) => {
    // Moves the head knot by a given delta
    const move = ([deltaX, deltaY]: Point) => {
        head[0] += deltaX;
        head[1] += deltaY;
    };

    // Return the head knot and its movement function
    return [head, move] as const;
};

// Normalize a given delta (ensuring it's between -1 and 1)
const normalizeDelta = (delta: number) => delta / Math.abs(delta) || 0;

// Creates a tail knot that can follow another knot
const createTail = (tail: Point = [0, 0]) => {
    // Moves the tail know by following a given knot
    const follow = ([knotX, knotY]: Point) => {
        // Gets the distance the knot has moved from the tail knot...
        const distance = Math.max(
            Math.abs(tail[0] - knotX),
            Math.abs(tail[1] - knotY),
        );
        // ... and if it's less than or equal to 1, do nothing
        if (distance <= 1) return;

        // Otherwise, get the delta X...
        const deltaX = knotX - tail[0];
        // ... and Y values
        const deltaY = knotY - tail[1];

        // Move the tail knot's X...
        tail[0] += normalizeDelta(deltaX);
        // ... and Y position by the normalized delta values
        tail[1] += normalizeDelta(deltaY);
    };

    // Return the tail knot and its follow function
    return [tail, follow] as const;
};

type Tail = ReturnType<typeof createTail>;

// Create multiple tail knots that can follow each other
const createTails = (amount: number, start: Point = [0, 0]) => {
    // Initialize an array of tail knots
    const tails: Tail[] = [];

    // Add the specified amount of tail nots to the tail knot array
    for (let index = 0; index < amount; index++) {
        tails[index] = createTail([...start]);
    }

    // Makes the first tail follow the given knot, and all others follow the previous tail
    const follow = (knot: Point) => {
        for (const [index, [_tail, tailFollow]] of tails.entries()) {
            tailFollow(!index ? knot : tails[index - 1][0]);
        }
    };

    // Return the tail knots and their follow function
    return [tails, follow] as const;
};

type PointKey = `${number}-${number}`;

// Converts a given point to its key representation
const asKey = (point: Point) => point.join('-') as PointKey;

// Create a set of unique point visits and the ability to update it
const createUniquePositions = (start: Point = [0, 0]) => {
    // Create a set of unique visits
    const visits = new Set<PointKey>();

    // Add a point to the visits set only if it's unique
    const add = (point: Point) => (
        visits.add(asKey(point))
    );

    // Mark the starting point as visited
    visits.add(asKey(start));

    // Return the set of unique visits and its add function
    return [visits, add] as const;
};

// Returns the amount of unique tail positions after a given set of movements
export const getAmountOfUniqueTailPositions = (
    movements: Movement[],
    knots = 2,
    start: Point = [0, 0],
) => {
    // Set up the head knot,...
    const [head, moveHead] = createHead(start);
    // ... tail knots,...
    const [tails, tailsFollow] = createTails(knots - 1, [...head]);
    // ... and a set of unique positions
    const [uniquePositions, addUniquePosition] = createUniquePositions([
        ...head,
    ]);

    // For each movement...
    for (const [deltaX, deltaY, amount] of movements) {
        // ... and the amount provided:
        for (let index = 0; index < amount; index++) {
            // 1. Move the head by the delta X/Y
            moveHead([deltaX, deltaY]);
            // 2. Have the tail knots follow the head and each other
            tailsFollow(head);
            // 3. Add the last tail knot's position to the set of unique positions
            addUniquePosition(tails.at(-1)![0]);
        }
    }

    // Finally, return the amount of unique positions the last tail knot was in
    return uniquePositions.size;
};
