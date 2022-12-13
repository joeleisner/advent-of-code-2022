import { assertEquals } from 'std/testing/asserts.ts';
import { getAmountOfUniqueTailPositions, parseInput } from './mod.ts';

const firstInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const secondInput = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

Deno.test('Day 09: Rope Bridge', async (test) => {
    await test.step(
        'Parse input',
        () => {
            assertEquals(
                parseInput(firstInput),
                [
                    [1, 0, 4],
                    [0, 1, 4],
                    [-1, 0, 3],
                    [0, -1, 1],
                    [1, 0, 4],
                    [0, -1, 1],
                    [-1, 0, 5],
                    [1, 0, 2],
                ],
            );
        },
    );

    const firstMovements = parseInput(firstInput);

    await test.step(
        'Amount of unique tail positions (2 knots)',
        () => {
            assertEquals(
                getAmountOfUniqueTailPositions(firstMovements),
                13,
            );
        },
    );

    await test.step(
        'Amount of unique tail positions (10 knots, small movements)',
        () => {
            assertEquals(
                getAmountOfUniqueTailPositions(firstMovements, 10),
                1,
            );
        },
    );

    const secondMovements = parseInput(secondInput);

    await test.step(
        'Amount of unique tail positions (10 knots, large movements)',
        () => {
            assertEquals(
                getAmountOfUniqueTailPositions(secondMovements, 10),
                36,
            );
        },
    );
});
