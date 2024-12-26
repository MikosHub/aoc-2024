import { Exec } from "../exec";

interface Cell {
  x: number;
  y: number;
  height: number;
}

interface Trailhead extends Cell {
  ends: Set<Cell>;
}

export class Day_10 extends Exec {
  getNeighboursOfHeightPlusOne(cell: Cell, map: Cell[]): Cell[] {
    const neighbours = [
      [cell.x + 1, cell.y],
      [cell.x - 1, cell.y],
      [cell.x, cell.y - 1],
      [cell.x, cell.y + 1],
    ];

    return map.filter(
      (c) =>
        neighbours.find((n) => n[0] === c.x && n[1] === c.y) &&
        c.height === cell.height + 1
    );
  }

  public part1(input: string): string {
    const map = this.splitNumeric(input, "\r\n", "");
    const width = map[0].length;
    const height = map.length;

    const trailheads: Trailhead[] = [];
    const cells: Cell[] = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const height = map[y][x];
        cells.push({ x, y, height });

        if (height === 0)
          trailheads.push({ x, y, height, ends: new Set<Cell>() });
      }
    }

    for (let th of trailheads) {
      let toCheck = new Set<Cell>();
      this.getNeighboursOfHeightPlusOne(th, cells).forEach((c) =>
        toCheck.add(c)
      );

      do {
        let nextToCheck = new Set<Cell>();
        for (let n of toCheck) {
          if (n.height === 9) {
            th.ends.add(n);
            continue;
          }

          this.getNeighboursOfHeightPlusOne(n, cells).forEach((c) =>
            nextToCheck.add(c)
          );
        }
        toCheck = nextToCheck;
      } while (toCheck.size > 0);
    }

    // console.log(trailheads);
    return String(trailheads.reduce((acc, cur) => (acc += cur.ends.size), 0));
  }
}
