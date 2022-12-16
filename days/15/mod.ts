type Point = [x: number, y: number];

// Returns the range of a given...
const getRange = (
    [sensorX, sensorY]: Point,
    [beaconX, beaconY]: Point,
) => (
    Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY)
);

interface Sensor {
    sensor: Point;
    beacon: Point;
    range: ReturnType<typeof getRange>;
}

// Parses an array of sensors, their beacon, and their range, from the input data
export const parseInput = (
    input: string,
) => (
    input
        .split('\n')
        .map((line) => {
            const [
                sensorX,
                sensorY,
                beaconX,
                beaconY,
            ] = line.match(/-?\d+/g)!.map(Number);

            const sensor: Point = [sensorX, sensorY];
            const beacon: Point = [beaconX, beaconY];

            return {
                sensor,
                beacon,
                range: getRange(sensor, beacon),
            } as Sensor;
        })
);

// Get the max range from the given sensors
const getMaxRange = (sensors: Sensor[]) =>
    Math.max(...sensors.map(({ range }) => range));

// Get the minimum/maximum X value from the given sensors and their beacons
const getX = (minOrMax: 'min' | 'max', sensors: Sensor[]) => (
    sensors.reduce(
        (value, { sensor: [sensorX], beacon: [beaconX] }) =>
            Math[minOrMax](value, sensorX, beaconX),
        0,
    )
);

// Get the minimum X value from the given sensors and their beacons
const getMinX = (sensors: Sensor[]) => getX('min', sensors);

// Get the maximum X value from the given sensors and their beacons
const getMaxX = (sensors: Sensor[]) => getX('max', sensors);

// Returns the available positions not containing beacons from the given sensors and Y value
export const getAvailablePositions = (sensors: Sensor[], y: number) => {
    // Grab the mininum...
    const minX = getMinX(sensors);
    // ... and maximum X values,...
    const maxX = getMaxX(sensors);
    // ... and the maximum range of the given sensors
    const maxRange = getMaxRange(sensors);

    // Initialize a number for available positions
    let availablePositions = 0;

    xLoop:
    // For each X position from farthest left to farthest right,...
    for (let x = minX - maxRange * 2; x <= maxX + maxRange * 2; x++) {
        sensorLoop:
        // ... and for each sensor, its beacon, and its range:
        for (
            const {
                sensor: [sensorX, sensorY],
                beacon: [beaconX, beaconY],
                range,
            } of sensors
        ) {
            // If there's a beacon at the current X/Y, continue through the X positions
            if (x === beaconX && y === beaconY) continue xLoop;

            // If we're outside the sensor's range,...
            if (Math.abs(x - sensorX) + Math.abs(y - sensorY) > range) {
                // ... continue through the sensors
                continue sensorLoop;
            }

            // Otherwise, increment the available positions...
            availablePositions++;
            // ... and break the sensor loop
            break sensorLoop;
        }
    }

    // Return the amount of available positions
    return availablePositions;
};

// Finds the X/Y coordinate of a distress signal from the given sensors and maximum Y depth
const findDistressSignal = (sensors: Sensor[], maxY: number) => {
    // Initialize a distress signal point
    let distressSignal: Point = [0, 0];

    rowLoop:
    // For each Y value through the maximum Y provided:
    for (let y = 0; y <= maxY; y++) {
        // Create an array of points to skip
        const skip: Point[] = [];

        sensorLoop:
        // For each sensor:
        for (const { sensor: [sensorX, sensorY], range } of sensors) {
            // Get its distance from the current Y...
            const distanceFromRow = Math.abs(sensorY - y);
            // ... and its change in X using this subtracted from its range
            const deltaX = range - distanceFromRow;

            // If the change in X is less than or equal to zero, continue through the sensors
            if (deltaX <= 0) continue sensorLoop;

            // Otherwise, create a point...
            const point = [
                // ... with a maximum X...
                Math.max(sensorX - deltaX, 0),
                // ... and minimum Y
                Math.min(sensorX + deltaX, maxY),
            ] as Point;

            // Finally, add the point to be skipped
            skip.push(point);
        }

        // Initialize a threshold value
        let threshold = 0;

        skipLoop:
        while (true) {
            // Find a skip point...
            const point = skip.find(([x, y]) => {
                // ... that is not within the threshold...
                if (x - 1 > threshold || threshold >= y) return false;
                // ... and update the threshold when gound
                threshold = y;
                return true;
            });

            // If a point was not found, break the skip loop
            if (!point) break skipLoop;
        }

        // If the threshold is at the max Y value, continue through the row loop
        if (threshold === maxY) continue rowLoop;

        // Set the distress signal point
        distressSignal = [threshold + 1, y];
    }

    // Return the distress signal point
    return distressSignal;
};

// Get the tuning frequency of a distress signal from the given sensors and maximum Y depth
export const getTuningFrequencyOfDistressSignal = (
    sensors: Sensor[],
    maxY: number,
) => {
    const [distressX, distressY] = findDistressSignal(sensors, maxY);
    return distressX * 4_000_000 + distressY;
};
