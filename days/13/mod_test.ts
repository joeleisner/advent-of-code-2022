import { assertEquals } from 'std/testing/asserts.ts';
import {
    getDecoderKey,
    getSumOfOrderedPacketPairIndices,
    parseInput,
} from './mod.ts';

const input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

Deno.test('Day 13: Distress Signal', async (test) => {
    await test.step(
        'Parse input',
        () => {
            assertEquals(
                parseInput(input),
                [
                    [
                        [1, 1, 3, 1, 1],
                        [1, 1, 5, 1, 1],
                    ],
                    [
                        [[1], [2, 3, 4]],
                        [[1], 4],
                    ],
                    [
                        [9],
                        [[8, 7, 6]],
                    ],
                    [
                        [[4, 4], 4, 4],
                        [[4, 4], 4, 4, 4],
                    ],
                    [
                        [7, 7, 7, 7],
                        [7, 7, 7],
                    ],
                    [
                        [],
                        [3],
                    ],
                    [
                        [[[]]],
                        [[]],
                    ],
                    [
                        [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
                        [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
                    ],
                ],
            );
        },
    );

    const pairs = parseInput(input);

    await test.step(
        'Sum of ordered packet pair indices',
        () => {
            assertEquals(
                getSumOfOrderedPacketPairIndices(pairs),
                13,
            );
        },
    );

    await test.step(
        'Decoder key',
        () => {
            assertEquals(
                getDecoderKey(pairs),
                140,
            );
        },
    );
});
