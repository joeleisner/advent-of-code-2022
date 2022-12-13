type AssignmentRange = `${string}-${string}`;

// Converts an assignment range pair string to array
const asAssignmentRangePairs = (assignmentPair: string) => (
    assignmentPair.split(',') as AssignmentRange[]
);

type AssignmentTuple = [
    start: number,
    end: number,
];

// Converts multiple assignment range strings into tuples
const asAssignmentTuples = (assignmentRanges: AssignmentRange[]) => (
    assignmentRanges.map(
        (assignmentRange) =>
            assignmentRange.split('-').map(Number) as AssignmentTuple,
    )
);

// Parses the assignment pairs from the input data
export const parseInput = (input: string) => (
    input
        // 1. Split the data at every new line character
        .split('\n')
        // 2. Convert each assignment pair string into an array
        .map(asAssignmentRangePairs)
        // 3. Convert each assignment range into a tuple
        .map(asAssignmentTuples)
);

// Returns whether the given assignment pairs contain one another
export const onlyContainedPairs = ([
    [firstAssignmentStart, firstAssignmentEnd],
    [secondAssignmentStart, secondAssignmentEnd],
]: AssignmentTuple[]) => (
    // If A starts before B and A ends after B ends or...
    (firstAssignmentStart <= secondAssignmentStart &&
        firstAssignmentEnd >= secondAssignmentEnd) ||
    // ... if B starts before A and B ends after A ends
    (secondAssignmentStart <= firstAssignmentStart &&
        secondAssignmentEnd >= firstAssignmentEnd)
);

// Returns whether the given assignment pairs overlap one another
export const onlyOverlappingPairs = ([
    [firstAssignmentStart, firstAssignmentEnd],
    [secondAssignmentStart, secondAssignmentEnd],
]: AssignmentTuple[]) => (
    // If A starts after B starts but before B ends or...
    (firstAssignmentStart >= secondAssignmentStart &&
        firstAssignmentStart <= secondAssignmentEnd) ||
    // ... if B starts after A starts but before A ends
    (secondAssignmentStart >= firstAssignmentStart &&
        secondAssignmentStart <= firstAssignmentEnd)
);
