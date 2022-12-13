// Get the day directories
const getDays = async (numbers?: Set<string>) => {
    // Initialize an array to store day directories
    const days: string[] = [];

    // For each file in the current directory...
    for await (
        const { name, isDirectory } of Deno.readDir(
            new URL('./', import.meta.url),
        )
    ) {
        // ... if it's a directory, add it the day directory array
        if (isDirectory) days.push(name);
    }

    // Sort the days
    days.sort();

    // If no day numbers were provided, return all days
    if (!numbers) return days;

    // Otherwise, filter the days that include the given numbers...
    const filtered = days.filter((day) => numbers.has(day));
    // ... and return them if any were found, falling back to all days
    return filtered.length ? filtered : days;
};

// The day directories filtered by the given day numbers
const days = await getDays(new Set(Deno.args));

// Gets the day/title from the given directory's readme.md
const getDayTitle = async (directory: string) => {
    // Get the contents of the directory's readme.md...
    const readme = await Deno.readTextFile(
        new URL(`./${directory}/readme.md`, import.meta.url),
    );
    // ... and pull the day/title from its first line
    const [day, title] = readme
        .split('\n')[0]
        .slice(2)
        .split(': ');

    // Finally, return day with a colon and the title as an array
    return [day + ':', title];
};

import { cyan, green } from 'std/fmt/colors.ts';

// Runs a script of the given day directory
const runDay = async (directory: string) => {
    // Get the day/title from the directory...
    const [day, title] = await getDayTitle(directory);
    // ... and log them to the console with colors
    console.log(
        green(day),
        cyan(title),
    );

    // Finally, import the script to run it
    await import(`./${directory}/main.ts`);
};

// For each day,...
for (const day of days) {
    // ... run its main script
    await runDay(day);
}
