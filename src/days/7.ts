import { Exec } from "../exec";

enum Operators {
  add,
  mult,
  conc,
}

export class Day_7 extends Exec {
  getOperator(value: number, isPt1: boolean): Operators {
    if (isPt1) {
      if (value < 50) return Operators.add;
      return Operators.mult;
    } else {
      if (value < 33) return Operators.add;
      if (value < 67) return Operators.mult;
      return Operators.conc;
    }
  }

  checkRow(result: number, operands: number[], isPt1: boolean): boolean {
    const pow = isPt1 ? 2 : 3;
    const possibilities: Operators[][] = new Array(
      Math.pow(pow, operands.length - 1)
    );

    for (let i = 0; i < possibilities.length; i++) {
      const possRow: Operators[] = [];
      for (let j = 0; j < operands.length - 1; j++) {
        const val = Math.round(((i / Math.pow(pow, j + 1)) % 1) * 100);
        // console.log(i, j, val, this.getOperator(val, isPt1));
        possRow.push(this.getOperator(val, isPt1));
      }
      possibilities[i] = possRow;
    }
    // console.log(result, possibilities);

    let possible = false;
    for (let possRow of possibilities) {
      let total = operands[0];
      for (let i = 0; i < possRow.length; i++) {
        if (possRow[i] === Operators.mult) {
          total *= operands[i + 1];
        } else if (possRow[i] === Operators.add) {
          total += operands[i + 1];
        } else {
          const newNum = `${total}${operands[i + 1]}`;
          total = parseInt(newNum);
        }
      }
      if (total === result) possible = true;
    }

    return possible;
  }

  public part1(input: string): string {
    const data = this.split(input, "\r\n", ":");

    let sum = 0;
    for (let row of data) {
      const result = parseInt(row[0]);
      const operands = row[1]
        .trim()
        .split(" ")
        .map((val) => parseInt(val));
      if (this.checkRow(result, operands, true)) {
        sum += result;
        console.log(result);
      }
    }

    return String(sum);
  }

  public part2(input: string): string {
    const data = this.split(input, "\r\n", ":");

    let sum = 0;
    for (let row of data) {
      const result = parseInt(row[0]);
      const operands = row[1]
        .trim()
        .split(" ")
        .map((val) => parseInt(val));
      if (this.checkRow(result, operands, false)) {
        sum += result;
        console.log(result);
      }
    }

    return String(sum);
  }
}
