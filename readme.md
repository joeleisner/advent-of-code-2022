# Advent of Code in TypeScript by Joel Eisner

Joel Eisner's completed TypeScript code challenges for "Advent of Code" 2022.

## Installation

```sh
git clone git@github.com:joeleisner/advent-of-code-2022.git
cd advent-of-code-2022
deno test
```

### Requirements

- [Deno@1.28.3](https://deno.land/manual@v1.28.3/introduction)

### Recommendations

- [Deno for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)
- [Visual Studio Code](https://code.visualstudio.com/)

## Operation

```sh
# Run the completed code challenges for each day
deno task day-01
deno task day-02
deno task day-03
# ...

# Run the tests for each daily challenge
deno task test-days

# Run a test for a specific daily challenge
deno task test-day-01
deno task test-day-02
deno task test-day-03
# ...

# Run the tests for each library
deno task test-libs
```