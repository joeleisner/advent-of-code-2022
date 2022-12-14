import { assertEquals } from 'std/testing/asserts.ts';
import { are, areNumbers } from './type.ts';

type Variable = number | string;

const variables = [
    1,
    2,
    3,
    4,
] as Variable[];

Deno.test('Type library', async (test) => {
    await test.step(
        'Are the same type',
        () => {
            assertEquals(
                are('string', ...variables),
                false,
            );
        },
    );

    await test.step(
        'Are numbers',
        () => {
            assertEquals(
                areNumbers(...variables),
                true,
            );
        },
    );
});
