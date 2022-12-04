type AssignmentRange = `${string}-${string}`;

// Converts an assignment range pair string to array
const asAssignmentRangePairs = (assignmentPair: string) => (
    assignmentPair.split(',') as AssignmentRange[]
);

type AssignmentTuple = [number,number];

// Converts multiple assignment range strings into tuples
const asAssignmentTuples = (assignmentRanges: AssignmentRange[]) => (
    assignmentRanges.map(
        (assignmentRange) => assignmentRange.split('-').map(Number) as AssignmentTuple
    )
);

// Grab the assignment pairs from the input data
const assignmentPairs = (await Deno.readTextFile(new URL('./input.txt', import.meta.url)))
    // 1. Split the data at every new line character
    .split('\n')
    // 2. Convert each assignment pair string into an array
    .map(asAssignmentRangePairs)
    // 3. Convert each assignment range into a tuple
    .map(asAssignmentTuples);

// Returns whether the given assignment pairs contain one another
const onlyContainedPairs = ([
    [ firstAssignmentStart, firstAssignmentEnd ],
    [ secondAssignmentStart, secondAssignmentEnd ]
]: AssignmentTuple[]) => (
    // If A starts before B and A ends after B ends or...
    (firstAssignmentStart <= secondAssignmentStart && firstAssignmentEnd >= secondAssignmentEnd) ||
    // ... if B starts before A and B ends after A ends
    (secondAssignmentStart <= firstAssignmentStart && secondAssignmentEnd >= firstAssignmentEnd)
);

// The amount of fully contained assignment pairs
const containedPairsAmount = assignmentPairs
    // 1. Filter out only contained assignment pairs
    .filter(onlyContainedPairs)
    // 2. Return the length of the array
    .length;

console.log('Fully contained pairs:', containedPairsAmount, '(Part 1)');

// Returns whether the given assignment pairs overlap one another
const onlyOverlappingPairs = ([
    [ firstAssignmentStart, firstAssignmentEnd ],
    [ secondAssignmentStart, secondAssignmentEnd ]
]: AssignmentTuple[]) => (
    // If A starts after B starts but before B ends or...
    (firstAssignmentStart >= secondAssignmentStart && firstAssignmentStart <= secondAssignmentEnd) ||
    // ... if B starts after A starts but before A ends
    (secondAssignmentStart >= firstAssignmentStart && secondAssignmentStart <= firstAssignmentEnd)
);

// The amount of overlapping assignment pairs
const overlappingPairsAmount = assignmentPairs
    // 1. Filter out only overlapping assignment pairs
    .filter(onlyOverlappingPairs)
    // 2. Return the length of the array
    .length;

console.log('Overlapping pairs:', overlappingPairsAmount, '(Part 2)');
