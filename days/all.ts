import { days, runDay } from './mod.ts';

for (const day of days) {
    await runDay(day);
}
