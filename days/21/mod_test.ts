import { assertEquals } from 'std/testing/asserts.ts';
import { getNumber, getYourNumber, parseInput } from './mod.ts';

const input = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`;

Deno.test('Day 21: Monkey Math', async (test) => {
    await test.step(
        'Parse input',
        () => {
            assertEquals(
                [...parseInput(input).entries()],
                [
                    ['root', ['pppw', '+', 'sjmn']],
                    ['dbpl', 5],
                    ['cczh', ['sllz', '+', 'lgvd']],
                    ['zczc', 2],
                    ['ptdq', ['humn', '-', 'dvpt']],
                    ['dvpt', 3],
                    ['lfqf', 4],
                    ['humn', 5],
                    ['ljgn', 2],
                    ['sjmn', ['drzm', '*', 'dbpl']],
                    ['sllz', 4],
                    ['pppw', ['cczh', '/', 'lfqf']],
                    ['lgvd', ['ljgn', '*', 'ptdq']],
                    ['drzm', ['hmdt', '-', 'zczc']],
                    ['hmdt', 32],
                ],
            );
        },
    );

    const monkeys = parseInput(input);

    await test.step(
        'Number yelled by "drzm"',
        () => {
            assertEquals(
                getNumber(monkeys, 'drzm')[0],
                30,
            );
        },
    );

    await test.step(
        'Number yelled by "sjmn',
        () => {
            assertEquals(
                getNumber(monkeys, 'sjmn')[0],
                150,
            );
        },
    );

    await test.step(
        'Number yelled by "root"',
        () => {
            assertEquals(
                getNumber(monkeys),
                [152, [2, 150]],
            );
        },
    );

    await test.step(
        'Your number to yell',
        () => {
            assertEquals(
                getYourNumber(monkeys),
                301,
            );
        },
    );
});
