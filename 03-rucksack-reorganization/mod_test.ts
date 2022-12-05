import { assertEquals } from 'std/testing/asserts.ts';
import {
    getRucksackGroupBadgePrioritySum,
    getRucksackItemPrioritySum,
    parseInput
} from './mod.ts';

const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

Deno.test('Day 3: Rucksack Reorganization', async (test) => {
    await test.step(
        'Parse input',
        () => {
            const rucksacks = parseInput(input);
            assertEquals(
                rucksacks,
                [
                    'vJrwpWtwJgWrhcsFMMfFFhFp',
                    'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
                    'PmmdzqPrVvPwwTWBwg',
                    'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
                    'ttgJtRGJQctTZtZT',
                    'CrZsJsPPZsGzwwsLwLmpwMDw'
                ]
            )
        }
    );

    const rucksacks = parseInput(input);

    await test.step(
        'Rucksack item priority sum',
        () => {
            const rucksackPriorityItemSum = getRucksackItemPrioritySum(rucksacks);
            assertEquals(
                rucksackPriorityItemSum,
                157
            );
        }
    );

    await test.step(
        'Rucksack group badge priority sum',
        () => {
            const rucksackGroupBadgePrioritySum = getRucksackGroupBadgePrioritySum(rucksacks);
            assertEquals(
                rucksackGroupBadgePrioritySum,
                70
            );
        }
    )
});