type Coordinate = [rowIndex: number, colIndex: number];

type Map = number[][];

interface Instructions {
    map: Map;
    start: Coordinate;
    end: Coordinate;
}

// Parses the map instructions from the given input data
export const parseInput = (input: string): Instructions => {
    // Initialize a starting...
    let start: Coordinate = [0, 0];
    // ... and ending coordinate
    let end: Coordinate = [0, 0];

    // Create a map from each line...
    const map = input.split('\n').map((line, rowIndex) => (
        // ... and character:
        line.split('').map((character, colIndex) => {
            // If the character is "S",...
            if (character === 'S') {
                // ... mark the starting coordinate...
                start = [rowIndex, colIndex];
                // ... and return zero
                return 0;
            }

            // If the character is "E",...
            if (character === 'E') {
                // ... mark the ending coordinate...
                end = [rowIndex, colIndex];
                // ... and return zero
                return 0;
            }

            // Otherwise, return the number value of the character
            return character.charCodeAt(0) - 96;
        })
    ));

    // Finally, return the instructions
    return {
        map,
        start,
        end,
    };
};
