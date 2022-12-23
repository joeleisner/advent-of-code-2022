import { getExposedSurfaceArea, parseInput } from './mod.ts';

// Grab the input data
const input = await Deno.readTextFile(new URL('./input.txt', import.meta.url));

// Get the set of cubes from the input data
const cubes = parseInput(input);

// Get the exposed surface area of all cubes
const exposedSurfaceArea = getExposedSurfaceArea(cubes);

console.log(
    'Exposed surface area (w/o air pockets)',
    exposedSurfaceArea,
    '(Part 1)',
);
