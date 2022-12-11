import { assertEquals } from 'std/testing/asserts.ts';
import {
    getMonkeyBusiness,
    getWorryLevelModulus,
    Monkey,
    parseInput,
} from './mod.ts';

const input = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
If true: throw to monkey 2
If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
If true: throw to monkey 2
If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
If true: throw to monkey 1
If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
If true: throw to monkey 0
If false: throw to monkey 1`;

Deno.test('Day 11: Monkey in the Middle', async (test) => {
    await test.step(
        'Parse input',
        () => {
            const [
                firstMonkey,
                secondMonkey,
                thirdMonkey,
                fourthMonkey,
            ] = parseInput(input);

            const testMonkey = (
                monkey: Monkey,
                items: Monkey['items'],
                operationResult: number,
                test: Monkey['test'],
            ) => {
                assertEquals(monkey.items, items);
                assertEquals(monkey.operation(2), operationResult);
                assertEquals(monkey.test, test);
                assertEquals(monkey.inspected, 0);
            };

            testMonkey(firstMonkey, [79, 98], 38, [23, 2, 3]);
            testMonkey(secondMonkey, [54, 65, 75, 74], 8, [19, 2, 0]);
            testMonkey(thirdMonkey, [79, 60, 97], 4, [13, 1, 3]);
            testMonkey(fourthMonkey, [74], 5, [17, 0, 1]);
        },
    );

    const monkeys = parseInput(input);

    await test.step(
        'Monkey business after 20 rounds',
        () => {
            assertEquals(
                getMonkeyBusiness(monkeys),
                10_605,
            );
        },
    );

    await test.step(
        'Get worry level modulus',
        () => {
            assertEquals(
                getWorryLevelModulus(monkeys),
                96577,
            );
        },
    );

    const worryLevelModulus = getWorryLevelModulus(monkeys);

    await test.step(
        'Monkey business after 10,000 rounds',
        () => {
            assertEquals(
                getMonkeyBusiness(monkeys, 10_000, worryLevelModulus),
                2_713_310_158,
            );
        },
    );
});
