import { dir } from "console";
import { Exec } from "../exec";

enum Direction {
  Up = 0,
  Right,
  Down,
  Left,
}

const directionIndex: Record<number, Direction> = {
  0: Direction.Up,
  1: Direction.Right,
  2: Direction.Down,
  3: Direction.Left,
};

interface Position {
  x: number;
  y: number;
}

interface GuardData extends Position {
  dir: Direction;
}

export class Day_6 extends Exec {
  public part1(input: string): string {
    const map = this.split(input, "\r\n", "");
    const startY = map.findIndex((row) => row.includes("^"));
    const startX = map[startY].findIndex((col) => col === "^");

    const guard: GuardData = {
      x: startX,
      y: startY,
      dir: Direction.Up,
    };

    const width = map[0].length;
    const height = map.length;

    const visited: string[][] = [];
    for (let y = 0; y < height; y++) {
      const row: string[] = [];
      for (let x = 0; x < width; x++) {
        row.push("");
      }
      visited.push(row);
    }

    do {
      visited[guard.y][guard.x] = "X";
      let newInFront = { x: guard.x, y: guard.y };

      switch (guard.dir) {
        case Direction.Up:
          guard.y--;
          newInFront.y = guard.y - 1;
          break;
        case Direction.Down:
          guard.y++;
          newInFront.y = guard.y + 1;
          break;
        case Direction.Left:
          guard.x--;
          newInFront.x = guard.x - 1;
          break;
        case Direction.Right:
          guard.x++;
          newInFront.x = guard.x + 1;
          break;
      }

      if (guard.x < 0 || guard.x >= width || guard.y < 0 || guard.y >= height) {
        break;
      }

      if (
        newInFront.y >= height ||
        newInFront.y < 0 ||
        newInFront.x >= width ||
        newInFront.x < 0
      )
        continue;

      if (map[newInFront.y][newInFront.x] === "#")
        guard.dir = directionIndex[(guard.dir + 1) % 4];
    } while (true);

    const noVisited = visited.reduce(
      (acc, row) =>
        (acc += row.reduce((accIn, col) => (accIn += col === "X" ? 1 : 0), 0)),
      0
    );
    return String(noVisited);
  }
}
