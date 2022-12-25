import { assertEquals } from 'std/testing/asserts.ts';
import { getSumAsSNAFU, parseInput } from './mod.ts';

const input = `1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`;

Deno.test('Day 25: Full of Hot Air', async (test) => {
    await test.step(
        'Parse input',
        () => {
            assertEquals(
                parseInput(input),
                [
                    1747,
                    906,
                    198,
                    11,
                    201,
                    31,
                    1257,
                    32,
                    353,
                    107,
                    7,
                    3,
                    37,
                ],
            );
        },
    );

    const numbers = parseInput(input);

    await test.step(
        'SNAFU sum',
        () => {
            assertEquals(
                getSumAsSNAFU(numbers),
                '2=-1=0',
            );
        },
    );
});
