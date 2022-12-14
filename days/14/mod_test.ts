import { assertEquals } from 'std/testing/asserts.ts';
import { getAmountOfSettledSand, parseInput } from './mod.ts';

const input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

Deno.test('Day 14: Regolith Reservoir', async (test) => {
    await test.step(
        'Parse input',
        () => {
            assertEquals(
                parseInput(input),
                [
                    [
                        [498, 4],
                        [498, 6],
                        [496, 6],
                    ],
                    [
                        [503, 4],
                        [502, 4],
                        [502, 9],
                        [494, 9],
                    ],
                ],
            );
        },
    );

    const rocks = parseInput(input);

    await test.step(
        'Amount of settled sand (before abyss)',
        () => {
            assertEquals(
                getAmountOfSettledSand(rocks),
                24,
            );
        },
    );

    await test.step(
        'Amount of settled sand (on floor)',
        () => {
            assertEquals(
                getAmountOfSettledSand(rocks, true),
                93,
            );
        },
    );
});
