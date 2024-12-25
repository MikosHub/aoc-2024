import { Exec } from "../exec";

export class Day_3 extends Exec {
  public part1(input: string): string {
    const matches = input.match(/mul\(\d{1,3},\d{1,3}\)/g);
    if (!matches) return "";

    let sum = 0;
    for (const match of matches) {
      const parts = match.match(/(\d{1,3})/g);
      if (!parts || parts.length < 2) continue;

      sum += parseInt(parts[0]) * parseInt(parts[1]);
    }

    return String(sum);
  }

  public part2(input: string): string {
    const matches = input.match(/mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/g);
    if (!matches) return "";

    let sum = 0;
    let enabled = true;
    for (const match of matches) {
      if (match === "don't()") {
        enabled = false;
        continue;
      }

      if (match === "do()") {
        enabled = true;
        continue;
      }

      const parts = match.match(/(\d{1,3})/g);
      if (!parts || parts.length < 2) continue;

      if (enabled) sum += parseInt(parts[0]) * parseInt(parts[1]);
    }

    return String(sum);
  }
}
