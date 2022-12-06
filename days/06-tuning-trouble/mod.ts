// Parses the data stream from the input data
export const parseInput = (input: string) => (
    input.split('')
);

// Returns the start-of marker with the given data stream and chunk length
const getMarker = (
    datastream: string[],
    chunkLength: number,
) => {
    // Initialize the marker as zero
    let marker = 0;

    // For each index (as start) in the data stream:
    for (const [start] of datastream.entries()) {
        // Get the index of the end of the chunk...
        const end = start + chunkLength;
        // ... and grab a chunk from start to end
        const chunk = datastream.slice(
            start,
            Math.min(end, datastream.length - 1),
        );

        // If the chunk is not of the specified length...
        if (chunk.length !== chunkLength) continue;
        // ... or the chunk does not contain only unique items, continue through the loop
        if (chunk.length !== new Set(chunk).size) continue;

        // Otherwise, set the marker as the end index...
        marker = end;
        // ... and break the loop
        break;
    }

    // Return the marker
    return marker;
};

// Returns the start-of-packet marker
export const getStartOfPacketMarker = (datastream: string[]) => (
    getMarker(datastream, 4)
);

// Returns the start-of-message marker
export const getStartOfMessageMarker = (datastream: string[]) => (
    getMarker(datastream, 14)
);
