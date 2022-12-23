type Cube = [x: number, y: number, z: number];

type CubeKey = `[${Cube[0]},${Cube[1]},${Cube[2]}]`;

type CubeSet = Set<CubeKey>;

// Parses a set of cubes from the given input data
export const parseInput = (input: string): CubeSet => (
    new Set(input.split('\n').map((cube) => `[${cube}]` as CubeKey))
);

// Returns all possible adjacent cubes of the given cube
const getAdjacentCubes = ([x, y, z]: Cube): Cube[] => [
    [x - 1, y, z],
    [x + 1, y, z],
    [x, y - 1, z],
    [x, y + 1, z],
    [x, y, z - 1],
    [x, y, z + 1],
];

// Retruns a cube tuple as a key
const cubeAsKey = (cube: Cube) => JSON.stringify(cube) as CubeKey;

// Returns all possible adjacent cube keys of the given cube
const getAdjacentCubeKeys = (cube: Cube) => (
    getAdjacentCubes(cube).map(cubeAsKey)
);

// Returns the adjacent cubes/air of a given cube in a given set
const getAdjacentSpacesOfCube = (cube: Cube, set: CubeSet) => {
    // Get the adjacent keys and whether they exist
    const adjacent = getAdjacentCubeKeys(cube)
        .map((key) => [key, set.has(key)] as const);

    // Create an array of cube keys if they exist...
    const cubes = adjacent
        .filter(([, exists]) => exists)
        .map(([key]) => key);
    // ... and an arrary of air keys if they don't exist
    const air = adjacent
        .filter(([, exists]) => !exists)
        .map(([key]) => key);

    // Return the cube/air keys as a pair
    return [cubes, air] as const;
};

// Returns a cube key as a tuple
const keyAsCube = (key: CubeKey) => JSON.parse(key) as Cube;

// Returns all adjacent cubes/air of a given cube set
const getAdjacentSpaces = (set: CubeSet) => {
    // Get the adjacent cubes in a set...
    const adjacent = [...set]
        .map((key) => getAdjacentSpacesOfCube(keyAsCube(key), set));
    // ... and separate out the cubes...
    const cubes = adjacent
        .map(([cubes]) => cubes)
        .reduce(
            (array, cubes) => [...array, ...cubes],
            [],
        );
    // ... and air
    const air = adjacent
        .map(([, air]) => air)
        .reduce(
            (array, air) => [...array, ...air],
            [],
        );

    // Return the cubes/air as a pair
    return [cubes, air] as const;
};

// Gets the total exposed surface area of a given cube set
export const getExposedSurfaceArea = (set: CubeSet) => {
    // Get the surface area of all cubes...
    const surfaceArea = set.size * 6;
    // ... and the adjacent cubes in the set
    const [cubes] = getAdjacentSpaces(set);

    // Return the amount of cubes subtracted from the surface area
    return surfaceArea - cubes.length;
};
