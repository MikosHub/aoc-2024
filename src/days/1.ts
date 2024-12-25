import { Exec } from "../exec";

export class Day_1 extends Exec {
  public part1(input: string): string {
    const data = this.split(input, "\r\n", "   ");

    const left = data.map((row) => parseInt(row[0]));
    const right = data.map((row) => parseInt(row[1]));
    left.sort();
    right.sort();

    const distances = new Array(left.length).fill(0);
    for (let i = 0; i < distances.length; i++) {
      distances[i] = Math.abs(left[i] - right[i]);
    }

    return distances.reduce((acc, cur) => (acc += cur), 0);
  }

  public part2(input: string): string {
    const data = this.split(input, "\r\n", "   ");

    const left = data.map((row) => parseInt(row[0]));
    const right = data.map((row) => parseInt(row[1]));

    const occurences = {};
    let similarity = 0;
    for (let no of left) {
      if (!occurences[no]) {
        occurences[no] = right.reduce(
          (acc, cur) => acc + (cur === no ? 1 : 0),
          0
        );
      }

      similarity += no * occurences[no];
    }

    return String(similarity);
  }
}
