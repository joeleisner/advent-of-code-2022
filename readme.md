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

Or use
[Visual Studio Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)
to get up and running with zero dependencies.

## Operation

```sh
# Run all completed code challenges
deno task days

# Run the completed code challenges of a set of days
deno task days 01 02 03

# Run the completed code challenges for each day
deno task days 01
deno task days 02
deno task days 03
# ...

# Test each daily challenge
deno test days

# Test a specific daily challenge
deno test days/01
deno test days/02
deno test days/03
# ...

# Test each library
deno test lib

# Test all code
deno test
```
