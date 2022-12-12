import { assertEquals } from 'std/testing/asserts.ts';
import { equals } from './array.ts';

Deno.test('Array library', async (test) => {
    await test.step(
        '2 arrays equal each other',
        () => {
            assertEquals(
                equals([1, 2, 3], [1, 2, 3]),
                true,
            );
        },
    );
});
