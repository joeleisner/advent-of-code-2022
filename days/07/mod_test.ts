import { assertEquals } from 'std/testing/asserts.ts';
import {
    getSizeOfDirectoryToDelete,
    parseInput,
    sumOfDirectories,
} from './mod.ts';

const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

Deno.test('Day 07: No Space Left On Device', async (test) => {
    await test.step(
        'Parse input',
        () => {
            assertEquals(
                [...parseInput(input).entries()],
                [
                    ['/', 48381165],
                    ['/a', 94853],
                    ['/a/e', 584],
                    ['/d', 24933642],
                ],
            );
        },
    );

    const directories = parseInput(input);

    await test.step(
        'Sum of directory sizes below 100000',
        () => {
            assertEquals(
                sumOfDirectories(directories, 100000),
                95437,
            );
        },
    );

    await test.step(
        'Size of directory to delete',
        () => {
            assertEquals(
                getSizeOfDirectoryToDelete(directories, 70000000, 30000000),
                24933642,
            );
        },
    );
});
