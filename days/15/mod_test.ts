import { assertEquals } from 'std/testing/asserts.ts';
import {
    getAvailablePositions,
    getTuningFrequencyOfDistressSignal,
    parseInput,
} from './mod.ts';

const input = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

Deno.test('Day 15: Beacon Exclusion Zone', async (test) => {
    await test.step(
        'Parse input',
        () => {
            assertEquals(
                parseInput(input),
                [
                    { sensor: [2, 18], beacon: [-2, 15], range: 7 },
                    { sensor: [9, 16], beacon: [10, 16], range: 1 },
                    { sensor: [13, 2], beacon: [15, 3], range: 3 },
                    { sensor: [12, 14], beacon: [10, 16], range: 4 },
                    { sensor: [10, 20], beacon: [10, 16], range: 4 },
                    { sensor: [14, 17], beacon: [10, 16], range: 5 },
                    { sensor: [8, 7], beacon: [2, 10], range: 9 },
                    { sensor: [2, 0], beacon: [2, 10], range: 10 },
                    { sensor: [0, 11], beacon: [2, 10], range: 3 },
                    { sensor: [20, 14], beacon: [25, 17], range: 8 },
                    { sensor: [17, 20], beacon: [21, 22], range: 6 },
                    { sensor: [16, 7], beacon: [15, 3], range: 5 },
                    { sensor: [14, 3], beacon: [15, 3], range: 1 },
                    { sensor: [20, 1], beacon: [15, 3], range: 7 },
                ],
            );
        },
    );

    const sensors = parseInput(input);

    await test.step(
        'Available positions',
        () => {
            assertEquals(
                getAvailablePositions(sensors, 10),
                26,
            );
        },
    );

    await test.step(
        'Tuning frequency of distress signal',
        () => {
            assertEquals(
                getTuningFrequencyOfDistressSignal(sensors, 20),
                56000011,
            );
        },
    );
});
