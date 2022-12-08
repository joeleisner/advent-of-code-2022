import { getHighestScenicScore, getVisibleTrees, parseInput } from './mod.ts';

// Grab the input data
const input = await Deno.readTextFile(new URL('./input.txt', import.meta.url));

// Get the tree grid from the input data
const trees = parseInput(input);

// Get the number of visible trees from outside the grid
const visibleTrees = getVisibleTrees(trees);

console.log('Visible trees outside the grid:', visibleTrees, '(Part 1)');

// Get the highest scenic score within the grid
const highestScenicScore = getHighestScenicScore(trees);

console.log('Highest scenic score:', highestScenicScore, '(Part 2)');
