type PacketValue = number | Packet;

type Packet = Array<PacketValue>;

type PacketPair = [left: Packet, right: Packet];

// Parses the packet pairs from the input data
export const parseInput = (input: string) => (
    input
        .split('\n\n')
        .map((pair) =>
            (
                pair
                    .split('\n')
                    .map((packet) => JSON.parse(packet)) as Packet
            ) as PacketPair
        )
);

import { areNumbers } from '@lib/type.ts';

// Converts a packet value to a packet (if not one already)
const convertToPacket = (value: PacketValue) => (
    typeof value === 'number' ? [value] : value
);

// Compare a packet pair and return whether they're in the correct order or not
const comparePacketPair = (
    left: Packet,
    right: Packet,
): boolean | null => {
    // For each left packet value:
    for (const [index, leftValue] of left.entries()) {
        // Attempt to grab the right value at the same index...
        const rightValue = right[index];
        // ... and if it doesn't exist, return false
        if (rightValue === undefined) return false;

        // If both values are numbers,...
        if (areNumbers(leftValue, rightValue)) {
            // ... continue through the loop if they're the same...
            if (leftValue === rightValue) continue;
            // ... otherwise, return whether the left value is smaller than the right
            return leftValue < rightValue;
        }

        // Compare both values as packets...
        const comparison = comparePacketPair(
            convertToPacket(leftValue),
            convertToPacket(rightValue),
        );
        // ... and if an order was found, return it
        if (comparison !== null) return comparison;
    }

    // If the left packet ran out of values, return true, otherwise no order was found
    return left.length < right.length ? true : null;
};

// Yields the index and comparison result of each packet pair
const comparePacketPairs = function* (pairs: PacketPair[]) {
    // For each packet pair,...
    for (const [index, [left, right]] of pairs.entries()) {
        // ... yield its index and comparison result
        yield [index, comparePacketPair(left, right) as boolean] as const;
    }
};

import { multiply, sum } from '@lib/math.ts';

// Returns the sum of ordered packet pair indices
export const getSumOfOrderedPacketPairIndices = (pairs: PacketPair[]) => {
    // Initialize a set of indices
    const indices = new Set<number>();

    // For each index and comparison result of each packet pair,...
    for (const [index, result] of comparePacketPairs(pairs)) {
        // ... if they're ordered, add the non-zero index to the set of indices
        if (result) indices.add(index + 1);
    }

    // Finally, return the sum of the indices
    return [...indices].reduce(sum);
};

// Returns the decoder key from the given packet pairs
export const getDecoderKey = (
    pairs: PacketPair[],
    [firstDecoderPacket, secondDecoderPacket] = [[[2]], [[6]]] as PacketPair,
) => {
    // Get the packet pairs:
    const packets = pairs
        // 1. Flattened into an array of packets...
        .reduce(
            (packets, [left, right]) => [...packets, left, right],
            // ... with the decoder packets included
            [firstDecoderPacket, secondDecoderPacket] as Packet[],
        )
        // 2. Sorted in order
        .sort((...packetPair) => comparePacketPair(...packetPair) ? -1 : 1);

    // Finally, return the non-zero indices...
    return [
        // ... of both decoder packets...
        packets.indexOf(firstDecoderPacket) + 1,
        packets.indexOf(secondDecoderPacket) + 1,
        // ... multiplied together
    ].reduce(multiply);
};
