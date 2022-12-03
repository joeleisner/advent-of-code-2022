// Grab the raw data from a text file
const rucksacks = (await Deno.readTextFile('./data/03.txt')).split('\n');

// Splits a string in half (an array with 2 strings of equal size)
const splitInHalf = (string: string) => {
    // Define the compartment size as half the length of the given string...
    const compartmentSize = Math.floor(string.length / 2);
    // ... and create a regular expression for the purposes of spliting the string at that length
    const regExp = new RegExp(`.{1,${compartmentSize}}`, 'g');

    // Return the string split in half
    return string.match(regExp) as [string,string];
}

// Returns the item type that exists in both rucksack compartments (or rucksacks)
const findSimilarItemType = (compartmentsOrRucksacks: string[]) => {
    // Convert the rucksack compartments or rucksacks into character sets
    const [
        firstCharacterSet,
        ...otherCharacterSets
    ] = compartmentsOrRucksacks
        .map((compartmentOrRucksack) => new Set(compartmentOrRucksack.split('')));

    // console.log(firstCharacterSet, otherCharacterSets);

    // For each character in the first character set,...
    for (const char of firstCharacterSet.values()) {
        // ... and if the other character sets have that character,...
        const existsInOtherCharacterSets = otherCharacterSets
            .map((characterSet) => characterSet.has(char))
            .every((match) => match === true);
        // ... return the character
        if (existsInOtherCharacterSets) return char;
    }

    // Otherwise, return an empty string
    return '';
}

// Converts a given item type to its priority value
const convertItemTypeToPriorityValue = (itemType: string) => {
    const alphabetIndex = itemType.toLowerCase().charCodeAt(0) - 96;
    const capitalizedOffset = itemType === itemType.toUpperCase() ? 26 : 0;
    return alphabetIndex + capitalizedOffset;
}

const sum = (total: number, priority: number) => total + priority;

// Convert the rucksacks into the sum of their priority item type value
const rucksackItemPrioritySum = rucksacks
    .map(splitInHalf) // 1. Split each rucksack into two compartments
    .map(findSimilarItemType) // 2. Find the similar item type between both compartments
    .map(convertItemTypeToPriorityValue) // 3. Convert the similar item type to its priority value
    .reduce(sum); // 4. Sum the priority values

console.log('Sum of priority item types:', rucksackItemPrioritySum, '(Part 1)');

// Convert the rucksacks into groups of 3
const groupByThree = ([
    firstRucksack,
    secondRucksack,
    thirdRucksack,
    ...otherRucksacks
]: string[]): string[][] => {
    // Define the group of 3...
    const group = [
        firstRucksack,
        secondRucksack,
        thirdRucksack
    ];
    // ... and if there are no rucksacks left, return the group as is (with empty elements removed)
    if (!otherRucksacks.length) return [group.filter(rucksack => rucksack !== undefined)];

    // Otherwise, return the group and recurse through the other rucksacks
    return [group].concat(groupByThree(otherRucksacks));
}

// Convert the rucksacks in groups of 3 into the sum of their priority item type value
const rucksackGroupBadgePrioritySum = groupByThree(rucksacks)
    .map(findSimilarItemType) // 1. Find the similar item type between all 3 rucksacks
    .map(convertItemTypeToPriorityValue) // 2. Convert the similar item type to its priority value
    .reduce(sum); // 3. Sum the priority values

console.log('Sum of priority item types:', rucksackGroupBadgePrioritySum, '(Part 2)');
