// Parses a grid of tree heights from the given input data
export const parseInput = (input: string) => (
    input
        .split('\n')
        .map((trees) => trees.split('').map(Number))
);

// Returns whether the given tree's row/column are on the edge of the grid
const isEdgeTree = (
    rowIndex: number,
    colIndex: number,
    trees: number[][],
) => (
    (!rowIndex || rowIndex === trees.length - 1) ||
    (!colIndex || colIndex === trees[rowIndex].length - 1)
);

// Returns the trees before a given index
const beforeTrees = (rowOrColumn: number[], index: number) => (
    rowOrColumn.slice(0, index).reverse()
);

// Returns the trees after a given index
const afterTrees = (rowOrColumn: number[], index: number) => (
    rowOrColumn.slice(index + 1)
);

// Returns the neighboring trees before/after a given index
const getRowNeighbors = (
    row: number[],
    index: number,
) => [beforeTrees(row, index), afterTrees(row, index)];

// Creates a function to check if a tree is shorter than a given value
const isShorterThan = (value: number) => (tree: number) => tree < value;

// Returns whether any given neighbors are shorter than the given tree
const neighborsShortThan = (neighbors: number[][], tree: number) => (
    neighbors.some((row) => row.every(isShorterThan(tree)))
);

const getColumnNeighbors = (
    column: number[],
    index: number,
) => [
    beforeTrees(column, (column.length - index) - 1),
    afterTrees(column, (column.length - index) - 1),
];

import { rotateClockwise } from '@lib/matrix.ts';

// Returns the number of visible trees outside of the given tree grid
export const getVisibleTrees = (trees: number[][]) => {
    // Initialize a visible value...
    let visible = 0;
    // ... and store a rotated version of the tree grid (columns)
    const columns = rotateClockwise(trees);

    // For each row...
    trees.forEach((row, rowIndex) => {
        // ... and column in the tree grid:
        row.forEach((tree, colIndex) => {
            // If the current tree is on the edge of the grid, mark it as visible
            if (isEdgeTree(rowIndex, colIndex, trees)) return visible += 1;

            // Get the neighboring trees in the row/column...
            const neighbors = [
                ...getRowNeighbors(row, colIndex),
                ...getColumnNeighbors(
                    columns[colIndex],
                    rowIndex,
                ),
            ];
            // ... and if any set are shorter thean the current tree, mark it as visible
            if (neighborsShortThan(neighbors, tree)) return visible += 1;
        });
    });

    // Finally, return the number of visible trees outside the tree grid
    return visible;
};

// Returns the amount of neighbor trees are visible to the given tree
const visibleNeighborTrees = (neighbors: number[], tree: number) => (
    neighbors.slice(0, neighbors.findIndex((neighbor) => neighbor >= tree))
        .length + 1
);

import { multiply } from '@lib/math.ts';
import { descending } from '@lib/sort.ts';

// Returns the highest scenic score within the given tree grid
export const getHighestScenicScore = (trees: number[][]) => {
    // Initialize the scenic scores
    const scenicScores: number[] = [];
    // ... and store a rotated version of the tree grid (columns)
    const columns = rotateClockwise(trees);

    // For each row...
    trees.forEach((row, rowIndex) => {
        // ... and column in the tree grid:
        row.forEach((tree, colIndex) => {
            // If the current tree is on the edge of the grid, continue
            if (isEdgeTree(rowIndex, colIndex, trees)) return;

            // Get the score of the neighboring row/column trees...
            const score = [
                ...getRowNeighbors(row, colIndex),
                ...getColumnNeighbors(
                    columns[colIndex],
                    rowIndex,
                ),
            ]
                // 1. Converted to the amount of trees visible to the current tree
                .map((neighbors) => visibleNeighborTrees(neighbors, tree))
                // 2. Multiplied together
                .reduce(multiply);

            // scenicScores.push(leftScore * rightScore * bottomScore * topScore);
            scenicScores.push(score);
        });
    });

    // Finally, return the highest scenic score
    return scenicScores.sort(descending).shift()!;
};
