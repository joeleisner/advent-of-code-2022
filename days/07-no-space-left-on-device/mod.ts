// Creates a key from a given path of directory strings
const createKeyFromPath = (path: string[]) => (
    '/' + path.join('/')
);

type Directories = Map<string, number>;

// Parses the map of directories and their sizes from the input data
export const parseInput = (
    input: string,
) => {
    // Split the input data into individual lines
    const lines = input.split('\n');

    // Create a map of directories...
    const directories = new Map<string, number>() as Directories;
    // ... and an array to store the current directory
    let path: string[] = [];

    // For each line of the input:
    lines.forEach((line) => {
        // Grab the type, name, and target from the line
        const [type, name, target] = line.split(' ');

        // If the type is a command...
        if (type === '$') {
            // ... and the name is to change directories,...
            if (name === 'cd') {
                // ... reset the path when on root,...
                if (target === '/') return path = [];
                // ... remove the last item when going up a directory,...
                if (target === '..') return path.pop();
                // ... and add the target directory otherwise
                return path.push(target);
            }

            // Continue for all other commands
            return;
        }

        // Create a key from the current path...
        const key = createKeyFromPath(path);
        // ... and if it doesn't exist in the directories, add it
        if (!directories.has(key)) directories.set(key, 0);

        // If the type is a a directory, continue
        if (type === 'dir') return;

        // Get the size of the file...
        const size = Number(type);
        // ... and add it to the current directory's size
        directories.set(key, directories.get(key)! + size);

        // Iterating backwards through the parent directories:
        for (let i = path.length - 1; i >= 0; i--) {
            // Get the parent directories key...
            const parent = createKeyFromPath(path.slice(0, i));
            // ... and add the file size to it's directory
            directories.set(parent, directories.get(parent)! + size);
        }
    });

    // Finally, return the directories
    return directories;
};

import { sum } from '@lib/math.ts';

// Returns the sum of every directory's size within a given threshold
export const sumOfDirectories = (
    directories: Directories,
    threshold?: number,
) => (
    // Return the directory values...
    [...directories.values()]
        // 1. Filtered to be below/at the given threshold
        .filter((size) => threshold ? size <= threshold : true)
        // 2. Added together
        .reduce(sum)
);

import { ascending } from '@lib/sort.ts';

// Returns the minimum size directory to delete in order to free up space
export const getSizeOfDirectoryToDelete = (
    directories: Directories,
    totalSpace: number,
    targetUnusedSpace: number,
) => {
    // Get the current unused space...
    const unusedSpace = totalSpace - directories.get('/')!;
    // ... and the minimum space needed to reach the target
    const spaceNeeded = targetUnusedSpace - unusedSpace;

    // Return the directory values...
    return [...directories.values()]
        // 1. Filtered to be at/above the space needed
        .filter((size) => size >= spaceNeeded)
        // 2. Sorted in ascending order (smallet to largest)
        .sort(ascending)
        // 3. Only the first item (or zero)
        .shift()!;
};
