import { assertEquals } from 'std/testing/asserts.ts';
import {
    onlyContainedPairs,
    onlyOverlappingPairs,
    parseInput
} from './mod.ts';

const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

Deno.test('Day 04: Camp Cleanup', async (test) => {
    await test.step(
        'Parse input',
        () => {
            const assignmentPairs = parseInput(input);
            assertEquals(
                assignmentPairs,
                [
                    [ [ 2, 4 ], [ 6, 8 ] ],
                    [ [ 2, 3 ], [ 4, 5 ] ],
                    [ [ 5, 7 ], [ 7, 9 ] ],
                    [ [ 2, 8 ], [ 3, 7 ] ],
                    [ [ 6, 6 ], [ 4, 6 ] ],
                    [ [ 2, 6 ], [ 4, 8 ] ]
                ]
            )
        }
    );

    const assignmentPairs = parseInput(input);

    await test.step(
        'Contained pairs',
        () => {
            const containedPairs = assignmentPairs
                .filter(onlyContainedPairs);

            assertEquals(
                containedPairs,
                [
                    [ [ 2, 8 ], [ 3, 7 ] ],
                    [ [ 6, 6 ], [ 4, 6 ] ]
                ]
            );
        }
    );

    await test.step(
        'Overlapping pairs',
        () => {
            const overlappingPairs = assignmentPairs
                .filter(onlyOverlappingPairs);

            assertEquals(
                overlappingPairs,
                [
                    [ [ 5, 7 ], [ 7, 9 ] ],
                    [ [ 2, 8 ], [ 3, 7 ] ],
                    [ [ 6, 6 ], [ 4, 6 ] ],
                    [ [ 2, 6 ], [ 4, 8 ] ]
                ]
            )
        }
    );
});
