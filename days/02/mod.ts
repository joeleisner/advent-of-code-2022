type OpponentMove = 'A' | 'B' | 'C';
type YourMove = 'X' | 'Y' | 'Z';
type Round = [OpponentMove, YourMove];

// Converts the input data to a matrix of RPS rounds
export const parseInput = (input: string) => (
    input
        // 1. Split the data by new line characters
        .split('\n')
        // 2. Split each round by a space character
        .map((round) => round.split(' ')) as Round[]
);

type Move = OpponentMove | YourMove;

// Converts a move to its corresponding score
function moveScore(move: Move) {
    switch (move) {
        case 'A':
        case 'X':
            return 1; // Rock is worth 1 point
        case 'B':
        case 'Y':
            return 2; // Paper is worth 2 points
        case 'C':
        case 'Z':
            return 3; // Scissors is worth 3 points
    }
}

type MoveScore = ReturnType<typeof moveScore>;
type RoundScores = [MoveScore, MoveScore];

// Returns the overall round score by comparing your score against that of your opponent
function overallRoundScore([opponentScore, yourScore]: RoundScores) {
    // Return your score plus 3 in the event of a draw
    if (opponentScore === yourScore) return yourScore + 3;

    // Return only your score in the event of playing scissors against rock
    if (opponentScore - yourScore === -2) return yourScore;

    // Return your score plus 6 in the event of a win
    if (
        opponentScore - yourScore === 2 || // Rock against scissors
        opponentScore < yourScore // All other win conditions
    ) return yourScore + 6;

    // Return only your score in the event of a loss
    return yourScore;
}

import { sum } from '@lib/math.ts';

// Returns the total score of all rounds
export const overallTotalScore = (rounds: Round[]) => (
    rounds
        .map((round) => overallRoundScore(round.map(moveScore) as RoundScores))
        .reduce(sum)
);

// Returns your move score based on your move (how the round should end) and your opponent's score
function comparativeMoveScore(
    yourMove: YourMove,
    opponentScore: MoveScore,
): MoveScore {
    // If you're meant to draw, return your opponent's score
    if (yourMove === 'Y') return opponentScore;

    // If you're meant to lose,...
    if (yourMove === 'X') {
        // ... return 3 if your opponent's score is 1,...
        if (opponentScore === 1) return 3;
        // ... otherwise return your opponent's score minus 1
        return opponentScore - 1 as MoveScore;
    }

    // Otherwise, you're meant to win and...
    // ... if your opponent's score is 3, return 1,...
    if (opponentScore === 3) return 1;
    // ... otherwise return your opponent's score + 1
    return opponentScore + 1 as MoveScore;
}

// Returns the total score of all rounds when basing your move score on your opponent's score
export const comparativeTotalScore = (rounds: Round[]) => (
    rounds
        .map(([oppenentMove, yourMove]) => {
            const opponentScore = moveScore(oppenentMove);
            return overallRoundScore([
                opponentScore,
                comparativeMoveScore(yourMove, opponentScore),
            ]);
        })
        .reduce(sum)
);
