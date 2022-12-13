import { assertEquals } from 'std/testing/asserts.ts';
import { getFewestSteps, parseInput } from './mod.ts';

const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

Deno.test('Day 12: Hill Climbing Algorithm', async (test) => {
    await test.step(
        'Parse input',
        () => {
            assertEquals(
                parseInput(input),
                {
                    map: [
                        [1, 1, 2, 17, 16, 15, 14, 13],
                        [1, 2, 3, 18, 25, 24, 24, 12],
                        [1, 3, 3, 19, 26, 26, 24, 11],
                        [1, 3, 3, 20, 21, 22, 23, 10],
                        [1, 2, 4, 5, 6, 7, 8, 9],
                    ],
                    start: [0, 0],
                    end: [2, 5],
                },
            );
        },
    );

    const { map, start, end } = parseInput(input);

    await test.step(
        'Fewest steps (start to end)',
        () => {
            assertEquals(
                getFewestSteps(
                    map,
                    start,
                    end,
                ),
                31,
            );
        },
    );

    await test.step(
        `Fewest steps (end to lowest)`,
        () => {
            assertEquals(
                getFewestSteps(
                    map,
                    end,
                    1,
                ),
                29,
            );
        },
    );
});
