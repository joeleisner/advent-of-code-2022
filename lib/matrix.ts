// Rotates a matrix clockwise
export const rotateClockwise = <T>(matrix: T[][]) => (
    matrix[0].map((_value, index) => (
        matrix.map((row) => row[index]).reverse()
    ))
);

// Rotates a matrix counter-clockwise
export const rotateCounterClockwise = <T>(matrix: T[][]) => (
    matrix[0].map((_val, index) => (
        matrix.map((row) => row[row.length - 1 - index])
    ))
);
