// Returns whether 2 arrays are equal
export const equals = <T>(first: T[], second: T[]) => (
    first.length === second.length &&
    first.every((value, index) => value === second[index])
);
