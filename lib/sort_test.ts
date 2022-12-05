import { assertEquals } from 'std/testing/asserts.ts';
import { ascending, descending } from './sort.ts';

Deno.test('Sort library', async (test) => {
    const numbers = [
        1, 9, 2,
        8, 3, 7,
        4, 6, 5
    ];

    await test.step(
        'Numbers in ascending order',
        () => {
            assertEquals(
                numbers.sort(ascending),
                [
                    1, 2, 3,
                    4, 5, 6,
                    7, 8, 9
                ]
            );
        }
    );

    await test.step(
        'Numbers in descending order',
        () => {
            assertEquals(
                numbers.sort(descending),
                [
                    9, 8, 7,
                    6, 5, 4,
                    3, 2, 1
                ]
            );
        }
    );
});
