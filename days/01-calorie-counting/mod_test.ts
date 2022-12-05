import { assertEquals } from 'std/testing/asserts.ts';
import { parseInput, topCalories } from './mod.ts';

const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

Deno.test('Day 01: Calorie Counting', async (test) => {
    await test.step(
        'Parse input',
        () => {
            const calorieMatrix = parseInput(input);
            assertEquals(
                calorieMatrix,
                [
                    [ 1000, 2000, 3000 ],
                    [ 4000 ],
                    [ 5000, 6000 ],
                    [ 7000, 8000, 9000 ],
                    [ 10000 ]
                ]
            )
        }
    );

    const calorieMatrix = parseInput(input);

    await test.step(
        'Top calories',
        () => {
            const descendingTopCalories = topCalories(calorieMatrix);
            assertEquals(
                descendingTopCalories,
                [
                    24000,
                    11000,
                    10000,
                    6000,
                    4000
                ]
            );
        }
    );
});
