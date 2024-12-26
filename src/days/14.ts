import { Exec } from "../exec";

interface Robot {
  pos: {
    x: number;
    y: number;
  };
  vel: {
    x: number;
    y: number;
  };
}

export class Day_14 extends Exec {
  readInput(input: string): Robot[] {
    const rows = input.split("\r\n");
    const robots: Robot[] = [];
    for (const row of rows) {
      const parts = row.match(/(-?\d+)/g)?.map((val) => parseInt(val));
      if (!parts) continue;

      robots.push({
        pos: { x: parts[0], y: parts[1] },
        vel: { x: parts[2], y: parts[3] },
      });
    }

    return robots;
  }

  countRobotsForPos(robots: Robot[], x: number, y: number): number {
    let count = 0;

    for (let robot of robots) {
      if (robot.pos.x === x && robot.pos.y === y) count++;
    }

    return count;
  }

  printMap(robots: Robot[], width: number, height: number) {
    for (let y = 0; y < height; y++) {
      let row = "";
      for (let x = 0; x < width; x++) {
        const count = this.countRobotsForPos(robots, x, y);
        row += count === 0 ? "." : count;
      }
      console.log(row);
    }
  }

  moveRobot(robot: Robot, width: number, height: number): void {
    robot.pos.x += robot.vel.x;
    robot.pos.y += robot.vel.y;

    if (robot.pos.x < 0) robot.pos.x += width;
    if (robot.pos.x >= width) robot.pos.x -= width;
    if (robot.pos.y < 0) robot.pos.y += height;
    if (robot.pos.y >= height) robot.pos.y -= height;
  }

  getQuadrant(x: number, y: number, width: number, height: number): number {
    const vertMid = Math.floor(height / 2);
    const horMid = Math.floor(width / 2);

    if (y < vertMid) {
      if (x < horMid) return 0;
      if (x > horMid) return 1;
    } else if (y > vertMid) {
      if (x < horMid) return 2;
      if (x > horMid) return 3;
    }

    return -1;
  }

  getCountsPerQuadrant(
    robots: Robot[],
    width: number,
    height: number
  ): number[] {
    const sums = [0, 0, 0, 0];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const count = this.countRobotsForPos(robots, x, y);
        const idx = this.getQuadrant(x, y, width, height);

        if (idx < 0) continue;

        sums[idx] += count;
      }
    }

    return sums;
  }

  public part1(input: string): string {
    const robots = this.readInput(input);
    const width = 101;
    const height = 103;
    const seconds = 100;

    // this.printMap(robots, width, height);

    for (let i = 0; i < seconds; i++) {
      for (let robot of robots) {
        this.moveRobot(robot, width, height);
      }
      this.printMap(robots, width, height);
    }

    this.printMap(robots, width, height);
    const sums = this.getCountsPerQuadrant(robots, width, height);

    let total = sums[0];
    for (let i = 1; i < sums.length; i++) {
      total *= sums[i];
    }
    return String(total);
  }
}
