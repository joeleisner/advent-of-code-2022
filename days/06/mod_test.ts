import { assertEquals } from 'std/testing/asserts.ts';
import {
    getStartOfMessageMarker,
    getStartOfPacketMarker,
    parseInput,
} from './mod.ts';

const input = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';

Deno.test('Day 06: Tuning Trouble', async (test) => {
    await test.step(
        'Parse input',
        () => {
            const datastream = parseInput(input);
            assertEquals(
                datastream,
                [
                    'm',
                    'j',
                    'q',
                    'j',
                    'p',
                    'q',
                    'm',
                    'g',
                    'b',
                    'l',
                    'j',
                    's',
                    'p',
                    'h',
                    'd',
                    'z',
                    't',
                    'n',
                    'v',
                    'j',
                    'f',
                    'q',
                    'w',
                    'r',
                    'c',
                    'g',
                    's',
                    'm',
                    'l',
                    'b',
                ],
            );
        },
    );

    const datastream = parseInput(input);

    await test.step(
        'Start-of-packet marker',
        () => {
            const marker = getStartOfPacketMarker(datastream);
            assertEquals(
                marker,
                7,
            );
        },
    );

    await test.step(
        'Start-of-message marker',
        () => {
            const marker = getStartOfMessageMarker(datastream);
            assertEquals(
                marker,
                19,
            );
        },
    );
});
