import { assertEquals } from 'std/testing/asserts.ts';
import { rotateClockwise, rotateCounterClockwise } from './matrix.ts';

const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];

Deno.test('Matrix library', async (test) => {
    await test.step(
        'Rotate matrix clockwise',
        () => {
            assertEquals(
                rotateClockwise(matrix),
                [
                    [7, 4, 1],
                    [8, 5, 2],
                    [9, 6, 3],
                ],
            );
        },
    );

    await test.step(
        'Rotate matrix counter-clockwise',
        () => {
            assertEquals(
                rotateCounterClockwise(matrix),
                [
                    [3, 6, 9],
                    [2, 5, 8],
                    [1, 4, 7],
                ],
            );
        },
    );
});
