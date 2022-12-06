import { assertEquals } from 'std/testing/asserts.ts';
import { sum, sumAll } from './math.ts';

Deno.test('Math library', async (test) => {
    await test.step(
        'Sum of 2 numbers',
        () => {
            assertEquals(
                sum(1, 2),
                3,
            );
        },
    );

    await test.step(
        'Sum of an array of numbers',
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
});
