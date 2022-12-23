import { assertEquals } from 'std/testing/asserts.ts';
import { getExposedSurfaceArea, parseInput } from './mod.ts';

const input = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`;

Deno.test('Day 18: Boiling Boulders', async (test) => {
    await test.step(
        'Parse input',
        () => {
            assertEquals(
                [...parseInput(input)],
                [
                    [2, 2, 2],
                    [1, 2, 2],
                    [3, 2, 2],
                    [2, 1, 2],
                    [2, 3, 2],
                    [2, 2, 1],
                    [2, 2, 3],
                    [2, 2, 4],
                    [2, 2, 6],
                    [1, 2, 5],
                    [3, 2, 5],
                    [2, 1, 5],
                    [2, 3, 5],
                ].map((cube) => JSON.stringify(cube)),
            );
        },
    );

    const cubes = parseInput(input);

    await test.step(
        'Exposed surface area (w/o air pockets)',
        () => {
            assertEquals(
                getExposedSurfaceArea(cubes),
                64,
            );
        },
    );
});
