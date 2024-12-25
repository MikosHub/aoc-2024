import * as readline from "readline";
import * as fs from "fs";
import { exit } from "process";
import { Exec } from "./exec";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(`${question}: `, (input) => resolve(input));
  });
}

const day = await ask("Day");
const part = await ask("Part");
const example = await ask("Use example [y/n]");
const useExample = example === "y";

const execFileName = `src/days/${day}.ts`;
if (!fs.existsSync(execFileName)) {
  console.error(`exec file ${execFileName} not found`);
  exit(1);
}

const module = await import(`./days/${day}.ts`);
const exec: Exec = new module[`Day_${day}`]();

const inputFileName = `src/resources/${day}_${
  useExample ? "example" : "full"
}.txt`;
if (!fs.existsSync(inputFileName)) {
  console.error(`input file ${inputFileName} not found`);
  exit(1);
}

const input = fs.readFileSync(inputFileName, "utf-8");

console.log(`Starting day ${day} part ${part} on ${inputFileName}`);

if (part === "2") console.log(exec.part2(input));
else console.log(exec.part1(input));

rl.close();
