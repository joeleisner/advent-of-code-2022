import { assertEquals } from 'std/testing/asserts.ts';
import { capitalize } from './string.ts';

Deno.test('String library', async (test) => {
    await test.step(
        'Capitalize string',
        () => {
            assertEquals(
                capitalize('joel'),
                'Joel',
            );
        },
    );
});
