import { Exec } from "../exec";

interface Block {
  id: number | undefined;
  length: number;
}

export class Day_9 extends Exec {
  public part1(input: string): string {
    const data = input.split("").map((val) => parseInt(val));

    let map: (number | undefined)[] = [];
    let id = 0;
    for (let i = 0; i < data.length; i++) {
      const isFile = i % 2 === 0;
      for (let j = 0; j < data[i]; j++) {
        map.push(isFile ? id : undefined);
      }
      if (isFile) id++;
    }

    let idx = -1;
    let end = map.length;
    do {
      idx++;

      if (typeof map[idx] === "number") continue;

      let tmp: number | undefined = undefined;
      do {
        tmp = map.pop();
      } while (tmp === undefined);
      map[idx] = tmp;
    } while (idx <= end);

    map = map.filter((val) => typeof val === "number");

    return String(
      map.reduce((acc, cur, idx) => {
        if (typeof cur !== "number" || typeof acc !== "number") return acc;
        return (acc += cur * idx);
      }, 0)
    );
  }

  public part2(input: string): string {
    const data = input.split("").map((val) => parseInt(val));

    let fileSystem: Block[] = [];
    let id = 0;
    for (let i = 0; i < data.length; i++) {
      const isFile = i % 2 === 0;
      if (data[i] === 0) continue;

      fileSystem.push({ id: isFile ? id : undefined, length: data[i] });
      if (isFile) id++;
    }

    let curId = id;
    do {
      curId--;

      const blockToMove = fileSystem.find((block) => block.id === curId);
      if (!blockToMove) continue;

      const oldBlockIdx = fileSystem.indexOf(blockToMove);

      for (let i = 0; i < fileSystem.length; i++) {
        const block = fileSystem[i];

        if (oldBlockIdx < i) continue;
        if (block.id !== undefined) continue;
        if (blockToMove.length > block.length) continue;

        const remaining = block.length - blockToMove.length;
        const insert: Block[] = [blockToMove];
        if (remaining > 0) insert.push({ id: undefined, length: remaining });

        fileSystem.splice(oldBlockIdx, 1, {
          id: undefined,
          length: blockToMove.length,
        });
        fileSystem.splice(i, 1, ...insert);
        break;
      }
    } while (curId > 0);

    let map: (number | undefined)[] = [];
    for (let i = 0; i < fileSystem.length; i++) {
      for (let j = 0; j < fileSystem[i].length; j++) {
        map.push(fileSystem[i].id);
      }
    }

    return String(
      map.reduce((acc, cur, idx) => {
        if (typeof cur !== "number" || typeof acc !== "number") return acc;
        return (acc += cur * idx);
      }, 0)
    );
  }
}
