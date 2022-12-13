import { assertEquals } from 'std/testing/asserts.ts';
import { getHighestScenicScore, getVisibleTrees, parseInput } from './mod.ts';

const input = `30373
25512
65332
33549
35390`;

Deno.test('Day 08: Treetop Tree House', async (test) => {
    await test.step(
        'Parse input',
        () => {
            assertEquals(
                parseInput(input),
                [
                    [3, 0, 3, 7, 3],
                    [2, 5, 5, 1, 2],
                    [6, 5, 3, 3, 2],
                    [3, 3, 5, 4, 9],
                    [3, 5, 3, 9, 0],
                ],
            );
        },
    );

    const trees = parseInput(input);

    await test.step(
        'Visible trees outside grid',
        () => {
            assertEquals(
                getVisibleTrees(trees),
                21,
            );
        },
    );

    await test.step(
        'Highest scenic score',
        () => {
            assertEquals(
                getHighestScenicScore(trees),
                8,
            );
        },
    );
});
