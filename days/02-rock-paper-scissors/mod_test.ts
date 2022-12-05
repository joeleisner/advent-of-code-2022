import { assertEquals } from 'std/testing/asserts.ts';
import {
    comparativeTotalScore,
    overallTotalScore,
    parseInput
} from './mod.ts';

const input = `A Y
B X
C Z`;

Deno.test('Day 02: Rock Paper Scissors', async (test) => {
    await test.step(
        'Parse input',
        () => {
            const rounds = parseInput(input);
            assertEquals(
                rounds,
                [
                    [ 'A', 'Y' ],
                    [ 'B', 'X' ],
                    [ 'C', 'Z' ]
                ]
            );
        }
    );

    const rounds = parseInput(input);

    await test.step(
        'Overall total score',
        () => {
            const totalScore = overallTotalScore(rounds);
            assertEquals(
                totalScore,
                15
            );
        }
    );

    await test.step(
        'Comparative total score',
        () => {
            const totalScore = comparativeTotalScore(rounds);
            assertEquals(
                totalScore,
                12
            );
        }
    )
});
