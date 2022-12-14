type Coordinates = [x: number, y: number];

// Parses the rock path coordinates from the input data
export const parseInput = (input: string) => (
    input
        .split('\n')
        .map((path) => (
            path
                .split(' -> ')
                .map((coordinates) => (
                    coordinates
                        .split(',')
                        .map(Number) as Coordinates
                ))
        ))
);

type CoordinatesKey = `${number}-${number}`;

// Returns the given coordinates as a coordinates key (joined together with a "-")
const asCoordinatesKey = (coordinates: Coordinates) =>
    coordinates.join('-') as CoordinatesKey;

type CoordinatesSet = Set<CoordinatesKey>;

// Creates the rocks inside the cave
const createRocks = (rockPaths: Coordinates[][]) => {
    // Create a coordinates key set to represent the rocks...
    const rocks: CoordinatesSet = new Set();
    // ... and initialize a variable to store the max height
    let maxHeight = 0;

    // For each rock path...
    for (const path of rockPaths) {
        // ... and each of its coordinates:
        for (const [index, [currentX, currentY]] of path.entries()) {
            // If we've reached the end of the path, break
            if (!path[index + 1]) break;

            // Grab the next coordinates in the path
            const [nextX, nextY] = path[index + 1];

            // Going from the current to next coordinates,...
            for (
                let x = currentX, y = currentY;
                x !== nextX || y !== nextY;
                x += Math.sign(nextX - currentX),
                    y += Math.sign(nextY - currentY)
            ) {
                // ... and the X/Y to the rocks set
                rocks.add(asCoordinatesKey([x, y]));
            }

            // Add the next coordinates to the rocks set...
            rocks.add(asCoordinatesKey([nextX, nextY]));
            // ... and update the max height
            maxHeight = Math.max(maxHeight, currentY, nextY);
        }
    }

    // Finally, increase the max height by one...
    maxHeight += 1;
    // ... and return the cave set and it
    return [rocks, maxHeight] as const;
};

// Creates the falling sand inside the cave
const createSand = (
    rocks: CoordinatesSet,
    maxHeight: number,
    floor = false,
) => {
    // Create a set of sand coordinates...
    const sand: CoordinatesSet = new Set();
    // ... and set a flag for ending the similating
    let end = false;

    // While simultating:
    while (!end) {
        // Initialize starting coordinates for the sand
        let [x, y] = [500, 0];

        // While further simulating:
        while (!end) {
            // If there's no floor and the Y has reached the max height,...
            if (!floor && y >= maxHeight) {
                // ... stop the simulation...
                end = true;
                // ... and continue the loop
                continue;
            }

            // If directly below the sand is available,...
            if (
                !rocks.has(asCoordinatesKey([x, y + 1])) &&
                !sand.has(asCoordinatesKey([x, y + 1])) &&
                y < maxHeight
            ) {
                // ... move to it next cycle...
                y += 1;
                // ... and continue the loop
                continue;
            }

            // If down-and-to-the-left of the sand is available...
            if (
                !rocks.has(asCoordinatesKey([x - 1, y + 1])) &&
                !sand.has(asCoordinatesKey([x - 1, y + 1])) &&
                y < maxHeight
            ) {
                // ... move to it next cycle...
                x -= 1;
                y += 1;
                // ... and continue the loop
                continue;
            }

            // If down-and-to-the-right of the sand is available...
            if (
                !rocks.has(asCoordinatesKey([x + 1, y + 1])) &&
                !sand.has(asCoordinatesKey([x + 1, y + 1])) &&
                y < maxHeight
            ) {
                // ... move to it next cycle...
                x += 1;
                y += 1;
                // ... and continue the loop
                continue;
            }

            // Otherwise, add the unit of sand's coordinates to the sand set...
            sand.add(asCoordinatesKey([x, y]));
            // ... and break the loop
            break;
        }

        // If the sand hasn't moved from the starting location, break the loop
        if (x === 500 && y === 0) end = true;
    }

    // Return how many units of sand have been dropped
    return sand;
};

// Returns the amount of settled sand
export const getAmountOfSettledSand = (
    rockPaths: Coordinates[][],
    floor?: boolean,
) => {
    // Create the rocks from the given rocks path...
    const rocks = createRocks(rockPaths);
    // ... and the sand with it and the given floor flag
    const sand = createSand(...rocks, floor);

    // Finally, return the sand size
    return sand.size;
};
