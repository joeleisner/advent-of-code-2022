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
