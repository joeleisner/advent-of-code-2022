// Returns whether all given variables are of the given type
export const are = <T>(type: string, ...variables: T[]) => (
    // Return the variables...
    variables
        // 1. Mapped to their `typeof` value
        .map((variable) => typeof variable)
        // 2. Converted to whether all values are of the same type
        .every((value) => value === type)
);

// Returns whether all given variables are numbers
export const areNumbers = <T>(...variables: T[]) => are('number', ...variables);
