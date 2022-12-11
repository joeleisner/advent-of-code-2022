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

// Returns the day directory for the given number
export const getDay = (number: string) => (
    days.find((day) => day.startsWith(number))
);

import { cyan, green, red } from 'std/fmt/colors.ts';

// Prints an error message to the console and exits the process
export const error = (message: string) => {
    console.error(red(message));
    Deno.exit(1);
};

import { capitalize } from '@lib/string.ts';

// Runs a script of the given day directory
export const runDay = async (
    directory: string,
    file = 'main.ts',
) => {
    // Get the number and title from the directory...
    const [number, titleStart, ...title] = directory.split('-');
    // ... and log them to the console with colors
    console.log(
        green(`Day ${number}:`),
        cyan(
            [
                capitalize(titleStart),
                ...title.map((word) =>
                    ['in', 'the'].includes(word) ? word : capitalize(word)
                ),
            ].join(' '),
        ),
    );

    // Finally, import the script to run it
    await import(`./${directory}/${file}`);
};
