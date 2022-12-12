type Coordinates = [rowIndex: number, colIndex: number];

type Height = number;

type Map = Height[][];

interface Instructions {
    map: Map;
    start: Coordinates;
    end: Coordinates;
}

// Parses the map instructions from the given input data
export const parseInput = (input: string): Instructions => {
    // Initialize a starting...
    let start: Coordinates = [0, 0];
    // ... and ending coordinates
    let end: Coordinates = [0, 0];

    // Create a map from each line...
    const map = input.split('\n').map((line, rowIndex) => (
        // ... and character:
        line.split('').map((character, colIndex) => {
            // If the character is "S",...
            if (character === 'S') {
                // ... mark the starting coordinate...
                start = [rowIndex, colIndex];
                // ... and return 1 ('a')
                return 1;
            }

            // If the character is "E",...
            if (character === 'E') {
                // ... mark the ending coordinate...
                end = [rowIndex, colIndex];
                // ... and return 26 ('z')
                return 26;
            }

            // Otherwise, return the number value of the character
            return character.charCodeAt(0) - 96;
        })
    ));

    // Finally, return the instructions
    return {
        map,
        start,
        end,
    };
};

type HeightCondition = (a: number, b: number) => boolean;

// Gets a height condition based on the start/end heights
const getHeightCondition = (
    start: Coordinates,
    end: Coordinates | Height,
    map: Map,
): HeightCondition => {
    // Get the start...
    const startHeight = map[start[0]][start[1]];
    // ... and end heights
    const endHeight = typeof end === 'number' ? end : map[end[0]][end[1]];

    // Return the appropriate height condition for the difference
    return startHeight < endHeight
        ? (a: number, b: number) => a - b <= 1
        : (a: number, b: number) => b - a <= 1;
};

// Returns an array of surrounding coordinates from the given row/column indexes
const getSurroundingCoordinates = (
    row: number,
    column: number,
): Coordinates[] => [
    // Above
    [row - 1, column],
    // Below
    [row + 1, column],
    // Left
    [row, column - 1],
    // Right
    [row, column + 1],
];

// Yields next coordinates from the given...
const getNextCoordinates = function* (
    // ... row/column indexes,...
    row: number,
    column: number,
    // ... current height,...
    height: number,
    // ... and map...
    map: Map,
    // ... using the given height condition
    heightCondition: HeightCondition,
) {
    // Grab the possible surrounding...
    const [
        // ... above,...
        above,
        // ... below,...
        below,
        // ... left,...
        left,
        // ... and right coordinates from the given row/column indexes
        right,
    ] = getSurroundingCoordinates(row, column);

    // If the above coordinate can be moved to,...
    if (row > 0 && heightCondition(map[row - 1][column], height)) {
        // ... yield it
        yield above;
    }

    // If the below coodinate can be moved to,...
    if (
        row < map.length - 1 && heightCondition(map[row + 1][column], height)
    ) {
        // ... yield it
        yield below;
    }

    // If the left coordinate can be moved to,...
    if (column > 0 && heightCondition(map[row][column - 1], height)) {
        // ... yield it
        yield left;
    }

    // If the right coordinate can be moved to,...
    if (
        column < map[row].length - 1 &&
        heightCondition(map[row][column + 1], height)
    ) {
        // ... yield it
        yield right;
    }
};

interface TrekPosition {
    coordinates: Coordinates;
    steps: number;
}

type CoordinatesKey = `${number}-${number}`;

import { equals as arraysEqual } from '@lib/array.ts';

// Returns the fewest amount of steps need to trek the map from start to end
export const getFewestSteps = (
    map: Map,
    start: Coordinates,
    end: Coordinates | Height,
) => {
    // Create a queue to track the trek positions...
    const queue: TrekPosition[] = [
        {
            coordinates: start,
            steps: 0,
        },
    ];
    // ... as well as a set of visited coordinates
    const visited: Set<CoordinatesKey> = new Set();

    // While there's trek positions in the queue:
    while (queue.length > 0) {
        // Take the first position from the queue...
        const position = queue.shift()!;
        // ... and create a key from its coordinates
        const key = position.coordinates.join('-') as CoordinatesKey;

        // If these coordinates have been visited, continue
        if (visited.has(key)) continue;

        // Mark the coordinates as visited
        visited.add(key);

        // If the position coordinates are at the end (wich are coordinates),...
        if (Array.isArray(end) && arraysEqual(position.coordinates, end)) {
            // ... return the amount of steps taken
            return position.steps;
        }

        // Grab the row/column index from the coordinates...
        const [row, column] = position.coordinates;
        // ... and the height at those indexes on the map
        const height = map[row][column];

        // If the height is the same as the end (which is a height),...
        if (typeof end === 'number' && height === end) {
            // ... return the amout of steps taken
            return position.steps;
        }

        // Get the appropriate height condition for the given start/end
        const heightCondition = getHeightCondition(start, end, map);

        // Get the next coordinates...
        const nextCoordinates = getNextCoordinates(
            row,
            column,
            height,
            map,
            heightCondition,
        );
        // ... and for each,...
        for (const coordinates of nextCoordinates) {
            // ... add it to the queue while incrementing the step amount
            queue.push({
                coordinates,
                steps: position.steps + 1,
            });
        }
    }
};
