import { assertEquals } from 'std/testing/asserts.ts';
import { multiply, multiplyAll, sum, sumAll } from './math.ts';

Deno.test('Math library', async (test) => {
    await test.step(
        'Sum 2 numbers',
        () => {
            assertEquals(
                sum(1, 2),
                3,
            );
        },
    );

    await test.step(
        'Sum an array of numbers',
        () => {
            assertEquals(
                sumAll([
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                ]),
                45,
            );
        },
    );

    await test.step(
        'Multipy 2 numbers',
        () => {
            assertEquals(
                multiply(2, 3),
                6,
            );
        },
    );

    await test.step(
        'Multiply an array of numbers',
        () => {
            assertEquals(
                multiplyAll([
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                ]),
                362880,
            );
        },
    );
});
