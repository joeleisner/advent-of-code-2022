import { assertEquals } from 'std/testing/asserts.ts';
import { getGroveCoordinates, parseInput } from './mod.ts';

const input = `1
2
-3
3
-2
0
4`;

Deno.test('Day 20: Grove Positioning System', async (test) => {
    await test.step(
        'Parse input',
        () => {
            assertEquals(
                parseInput(input),
                [
                    1,
                    2,
                    -3,
                    3,
                    -2,
                    0,
                    4,
                ],
            );
        },
    );

    const numbers = parseInput(input);

    await test.step(
        'Grove coordinates (encrypted)',
        () => {
            assertEquals(
                getGroveCoordinates(numbers),
                3,
            );
        },
    );

    await test.step(
        'Grove coordinates (decrypted)',
        () => {
            assertEquals(
                getGroveCoordinates(numbers, true),
                1623178306,
            );
        },
    );
});
