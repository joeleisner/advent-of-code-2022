import { assertEquals } from 'std/testing/asserts.ts';
import { parseInput, rearrangedTopCrates } from './mod.ts';

const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

Deno.test('Day 05: Supply Stacks', async (test) => {
    await test.step(
        'Parse input',
        async () => {
            const [
                crates,
                instructions,
            ] = await parseInput(input);
            assertEquals(
                crates,
                [
                    ['Z', 'N'],
                    ['M', 'C', 'D'],
                    ['P'],
                ],
            );
            assertEquals(
                instructions,
                [
                    [-1, 1, 0],
                    [-3, 0, 2],
                    [-2, 1, 0],
                    [-1, 0, 1],
                ],
            );
        },
    );

    const [
        crates,
        instructions,
    ] = await parseInput(input);

    await test.step(
        'Individually rearranged top crates',
        () => {
            assertEquals(
                rearrangedTopCrates(crates, instructions),
                'CMZ',
            );
        },
    );

    await test.step(
        'Multiple rearranged top crates',
        () => {
            assertEquals(
                rearrangedTopCrates(crates, instructions, false),
                'MCD',
            );
        },
    );
});
