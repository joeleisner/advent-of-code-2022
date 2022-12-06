// Parses the rucksacks from the input
export const parseInput = (input: string) => input.split('\n');

// Converts a rucksack into 2 compartments
const asCompartments = (rucksack: string) => {
    // Define the compartment size as half the length of the given rucksack...
    const compartmentSize = Math.floor(rucksack.length / 2);
    // ... and create a regular expression for the purposes of spliting the rucksack
    const regExp = new RegExp(`.{1,${compartmentSize}}`, 'g');

    // Return the rucksack as an array of 2 compartments
    return rucksack.match(regExp) as [string, string];
};

// Returns the item type that exists in multiple rucksack inventories
const findSimilarItemType = (inventories: string[]) => {
    // Convert the rucksack inventories into character sets
    const [
        firstCharacterSet,
        ...otherCharacterSets
    ] = inventories
        .map((inventory) => new Set(inventory.split('')));

    // For each character in the first character set,...
    for (const char of firstCharacterSet.values()) {
        // ... if all other character sets have that character,...
        const existsInOtherCharacterSets = otherCharacterSets
            .map((characterSet) => characterSet.has(char))
            .every((match) => match === true);
        // ... return the character
        if (existsInOtherCharacterSets) return char;
    }

    // Otherwise, return an empty string
    return '';
};

// Converts a given item type to its priority value
const convertItemTypeToPriorityValue = (itemType: string) => {
    // Get the letters position in the alphabet...
    const alphabetPosition = itemType.toLowerCase().charCodeAt(0) - 96;
    // ... and its offset value if it's capitalized
    const capitalizedOffset = itemType === itemType.toUpperCase() ? 26 : 0;

    // Return the alphabet position and capitalized offset added together
    return alphabetPosition + capitalizedOffset;
};

import { math } from '@lib/mod.ts';

// Converts the rucksacks into the sum of their priority item type value
export const getRucksackItemPrioritySum = (rucksacks: string[]) => (
    rucksacks
        // 1. Split each rucksack into two compartments
        .map(asCompartments)
        // 2. Find the similar item type between both compartments
        .map(findSimilarItemType)
        // 3. Convert the similar item type to its priority value
        .map(convertItemTypeToPriorityValue)
        // 4. Sum the priority values
        .reduce(math.sum)
);

// Converts the rucksacks into groups of 3
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
        thirdRucksack,
    ];
    // ... and if there are no rucksacks left, return the group as is (with empty elements removed)
    if (!otherRucksacks.length) {
        return [
            group.filter((rucksack) => rucksack !== undefined),
        ];
    }

    // Otherwise, return the group and recurse through the other rucksacks
    return [group].concat(groupByThree(otherRucksacks));
};

// Converts the rucksacks in groups of 3 into the sum of their priority item type value
export const getRucksackGroupBadgePrioritySum = (rucksacks: string[]) => (
    groupByThree(rucksacks)
        // 1. Find the similar item type between all 3 rucksacks
        .map(findSimilarItemType)
        // 2. Convert the similar item type to its priority value
        .map(convertItemTypeToPriorityValue)
        // 3. Sum the priority values
        .reduce(math.sum)
);
