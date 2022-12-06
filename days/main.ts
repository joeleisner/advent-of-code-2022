const days = [];

for await (
    const { name, isDirectory } of Deno.readDir(new URL('./', import.meta.url))
) {
    if (isDirectory) days.push(name);
}

import { cyan, green } from 'std/fmt/colors.ts';
import { string } from '@lib/mod.ts';

for (const day of days.sort()) {
    const [number, ...title] = day.split('-');
    console.log(
        green(`Day ${number}:`),
        cyan(title.map(string.capitalize).join(' ')),
    );
    await import(`./${day}/main.ts`);
}
