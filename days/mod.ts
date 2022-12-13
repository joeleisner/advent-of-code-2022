// Get the day directories
const getDays = async () => {
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

    // Finally, return the day directory array sorted
    return days.sort();
};

// The day directories in the current directory
export const days = await getDays();

// Returns the day directories filtered to include the given numbers
export const filterDays = (numbers: string[]) => {
    // Filter the day directories that include the given numbers...
    const filtered = days.filter((day) => numbers.includes(day));
    // ... and return them if any were found, falling back to all days
    return filtered.length ? filtered : days;
};

import { cyan, green } from 'std/fmt/colors.ts';

// Gets the day/title from the given directory's readme.md
const getTitle = async (directory: string) => {
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

// Runs a script of the given day directory
export const runDay = async (
    directory: string,
    file = 'main.ts',
) => {
    // Get the day/title from the directory...
    const [day, title] = await getTitle(directory);
    // ... and log them to the console with colors
    console.log(
        green(day),
        cyan(title),
    );

    // Finally, import the script to run it
    await import(`./${directory}/${file}`);
};
