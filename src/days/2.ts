import { Exec } from "../exec";

export class Day_2 extends Exec {
  public part1(input: string): string {
    const data = this.split(input, "\r\n", " ");

    let safe = 0;
    for (const row of data) {
      const distances: number[] = [];
      for (let i = 1; i < row.length; i++) {
        distances.push(parseInt(row[i]) - parseInt(row[i - 1]));
      }
      if (distances.find((val) => Math.abs(val) < 1 || Math.abs(val) > 3))
        continue;
      if (
        distances.every((val) => val > 0) ||
        distances.every((val) => val < 0)
      )
        safe++;
    }

    return String(safe);
  }

  public part2(input: string): string {
    const data = this.split(input, "\r\n", " ");

    return "";
  }
}
