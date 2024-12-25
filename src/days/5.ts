import { Exec } from "../exec";

export class Day_5 extends Exec {
  adheresToRule(update: number[], rule: number[]) {
    const idxLeft = update.indexOf(rule[0]);
    const idxRight = update.indexOf(rule[1]);
    let correct = false;
    if (idxLeft < 0 || idxRight < 0) correct = true;
    if (idxRight > idxLeft) correct = true;
    return correct;
  }

  public part1(input: string): string {
    const parts = input.split("\r\n\r\n");

    const rules = parts[0]
      .split("\r\n")
      .map((row) => row.split("|").map((val) => parseInt(val)));

    const updates = parts[1]
      .split("\r\n")
      .map((row) => row.split(",").map((val) => parseInt(val)));

    let correctUpdates: number[][] = [];
    for (const update of updates) {
      let correct = true;
      for (const rule of rules) {
        if (!this.adheresToRule(update, rule)) {
          correct = false;
          break;
        }
      }
      if (correct) correctUpdates.push(update);
    }

    let middles = correctUpdates.map((row) => row[Math.floor(row.length / 2)]);

    return String(middles.reduce((acc, cur) => (acc += cur), 0));
  }

  public part2(input: string): string {
    const parts = input.split("\r\n\r\n");

    const rules = parts[0]
      .split("\r\n")
      .map((row) => row.split("|").map((val) => parseInt(val)));

    const updates = parts[1]
      .split("\r\n")
      .map((row) => row.split(",").map((val) => parseInt(val)));

    let incorrectUpdates: number[][] = [];
    for (const update of updates) {
      let correct = true;
      for (const rule of rules) {
        if (!this.adheresToRule(update, rule)) correct = false;
      }
      if (!correct) incorrectUpdates.push(update);
    }

    const correctedUpdates: number[][] = [];
    for (let update of incorrectUpdates) {
      let correct = true;
      do {
        correct = true;
        for (const rule of rules) {
          if (!this.adheresToRule(update, rule)) {
            correct = false;
            const idxLeft = update.indexOf(rule[0]);
            const idxRight = update.indexOf(rule[1]);
            const tmp = update[idxLeft];
            update[idxLeft] = update[idxRight];
            update[idxRight] = tmp;

            break;
          }
        }
      } while (!correct);
      correctedUpdates.push(update);
    }
    let middles = correctedUpdates.map(
      (row) => row[Math.floor(row.length / 2)]
    );
    console.log(correctedUpdates);
    return String(middles.reduce((acc, cur) => (acc += cur), 0));
  }
}
