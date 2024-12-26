import { Exec } from "../exec";

export class Day_11 extends Exec {
  execute(input: string, limit: number): number {
    let stones = this.splitNumeric(input, "\r\n", " ")[0];

    for (let i = 0; i < limit; i++) {
      console.log(i, stones.length);
      const newStones: number[] = [];
      for (let stone of stones) {
        const stoneStr = String(stone);
        if (stone === 0) {
          newStones.push(1);
        } else if (stoneStr.length % 2 === 0) {
          const part1 = stoneStr.substring(0, stoneStr.length / 2);
          const part2 = stoneStr.substring(stoneStr.length / 2);
          newStones.push(parseInt(part1));
          newStones.push(parseInt(part2));
        } else {
          newStones.push(stone * 2024);
        }
      }
      stones = newStones;
      // console.log(stones);
    }

    return stones.length;
  }

  public part1(input: string): string {
    return String(this.execute(input, 25));
  }

  public part2(input: string): string {
    return String(this.execute(input, 75));
  }
}
