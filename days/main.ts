import { getDays, runDay } from './mod.ts';

const days = await getDays(new Set(Deno.args));

for (const day of days) {
    await runDay(day);
}
