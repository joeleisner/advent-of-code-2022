import { comparativeTotalScore, overallTotalScore, parseInput } from './mod.ts';

// Grab the input data
const input = await Deno.readTextFile(new URL('./input.txt', import.meta.url));

// Get the rounds from the input data
const rounds = parseInput(input);

// Your first total score
const firstTotalScore = overallTotalScore(rounds);

console.log('Overall total score:', firstTotalScore, '(Part 1)');

// Your second total score
const secondTotalScores = comparativeTotalScore(rounds);

console.log('Comparative total score:', secondTotalScores, '(Part 2)');
