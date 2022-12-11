import { error, getDay, runDay } from './mod.ts';

if (!Deno.args.length) error('Day number not provided!');

const dayNumber = Deno.args[0];

if (isNaN(Number(dayNumber))) error('Invalid day number provided!');

const day = getDay(dayNumber);

if (!day) error('Day not found!');

await runDay(day!);
