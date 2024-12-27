import { Exec } from "../exec";

enum CellType {
  Empty,
  Box,
  Wall,
  Guard,
}

interface Position {
  x: number;
  y: number;
}

interface Cell extends Position {
  type: CellType;
}

interface Data {
  map: Cell[];
  steps: string[];
  width: number;
  height: number;
}

const SymbolTypeMap = {
  ".": CellType.Empty,
  O: CellType.Box,
  "#": CellType.Wall,
  "@": CellType.Guard,
};

const TypeSymbolMap = {
  0: ".",
  1: "O",
  2: "#",
  3: "@",
};

export class Day_15 extends Exec {
  readInput(input: string): Data {
    const parts = input.split("\r\n\r\n");

    const map: Cell[] = [];
    const mapRows = parts[0].split("\r\n");
    const height = mapRows.length;
    const width = mapRows[0].length;

    for (let y = 0; y < mapRows.length; y++) {
      const row = mapRows[y].split("");
      for (let x = 0; x < row.length; x++) {
        const type = SymbolTypeMap[row[x]];
        map.push({ x, y, type });
      }
    }

    const steps = parts[1].split("");

    return {
      map,
      steps,
      width,
      height,
    };
  }

  getCellByPos(data: Data, pos: Position): Cell | undefined {
    return data.map.find((c) => c.x === pos.x && c.y === pos.y);
  }

  printMap(data: Data) {
    for (let y = 0; y < data.height; y++) {
      let row = "";
      for (let x = 0; x < data.width; x++) {
        const cell = this.getCellByPos(data, { x, y });
        if (!cell) continue;
        row += TypeSymbolMap[cell.type];
      }
      console.log(row);
    }
  }

  getCellsToMove(data: Data, step: string): Cell[] {
    const cellsToMove: Cell[] = [];

    const guard = data.map.find((c) => c.type === CellType.Guard);
    if (!guard) return cellsToMove;

    let pos = { x: guard.x, y: guard.y };
    let offset = { x: 0, y: 0 };
    switch (step) {
      case "<":
        offset.x = -1;
        break;
      case "^":
        offset.y = -1;
        break;
      case ">":
        offset.x = 1;
        break;
      case "v":
        offset.y = 1;
        break;
    }

    let cell = guard;
    do {
      const nextPos = { x: pos.x + offset.x, y: pos.y + offset.y };
      const nextCell = this.getCellByPos(data, nextPos);
      if (!nextCell) continue;

      if (nextCell.type === CellType.Empty) {
        cellsToMove.push(cell);
        break;
      }

      if (nextCell.type === CellType.Box) {
        console.log(cellsToMove);
        cellsToMove.push(cell);
        pos = nextPos;
      }

      if (nextCell.type === CellType.Wall) {
        cellsToMove.splice(0, cellsToMove.length);
        break;
      }
    } while (true);

    console.log(step, cellsToMove);
    return cellsToMove;
  }

  moveCells(data: Data, step: string, cellsToMove: Cell[]) {
    let offset = { x: 0, y: 0 };
    switch (step) {
      case "<":
        offset.x = -1;
        break;
      case "^":
        offset.y = -1;
        break;
      case ">":
        offset.x = 1;
        break;
      case "v":
        offset.y = 1;
        break;
    }

    for (let cell of cellsToMove) {
      const type = cell.type;
      const newPos = { x: cell.x + offset.x, y: cell.y + offset.y };
      const oldPos = { x: cell.x, y: cell.y };

      const oldCell = this.getCellByPos(data, oldPos);
      const newCell = this.getCellByPos(data, newPos);

      if (oldCell) oldCell.type = CellType.Empty;
      if (newCell) newCell.type = type;
    }
  }

  public part1(input: string): string {
    const data = this.readInput(input);

    this.printMap(data);

    for (let step of data.steps) {
      const cellsToMove = this.getCellsToMove(data, step);
      this.moveCells(data, step, cellsToMove);
      this.printMap(data);
    }

    return "";
  }
}
