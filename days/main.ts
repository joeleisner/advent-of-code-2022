import { filterDays, runDay } from './mod.ts';

const days = filterDays(Deno.args);

for (const day of days) {
    await runDay(day);
}
