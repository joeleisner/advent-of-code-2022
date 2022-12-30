import { assertEquals } from 'std/testing/asserts.ts';
import { getAmountOfEmptyGroundTiles, parseInput } from './mod.ts';

const input = `....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..`;

Deno.test('Day 23: Unstable Diffusion', async (test) => {
    await test.step(
        'Parse input',
        () => {
            assertEquals(
                [...parseInput(input).values()],
                [
                    '[4,0]',
                    '[2,1]',
                    '[3,1]',
                    '[4,1]',
                    '[6,1]',
                    '[0,2]',
                    '[4,2]',
                    '[6,2]',
                    '[1,3]',
                    '[5,3]',
                    '[6,3]',
                    '[0,4]',
                    '[2,4]',
                    '[3,4]',
                    '[4,4]',
                    '[0,5]',
                    '[1,5]',
                    '[3,5]',
                    '[5,5]',
                    '[6,5]',
                    '[1,6]',
                    '[4,6]',
                ],
            );
        },
    );

    const elves = parseInput(input);

    await test.step(
        'Amount of empty ground tiles',
        () => {
            assertEquals(
                getAmountOfEmptyGroundTiles(elves),
                110,
            );
        },
    );
});
