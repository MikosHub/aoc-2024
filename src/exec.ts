export class Exec {
  public splitNumeric(
    input: string,
    lineSplit: string,
    itemSplit: string
  ): number[][] {
    return input
      .split(lineSplit)
      .map((line) => line.split(itemSplit).map((val) => parseInt(val)));
  }

  public split(
    input: string,
    lineSplit: string,
    itemSplit: string
  ): string[][] {
    return input.split(lineSplit).map((line) => line.split(itemSplit));
  }

  public part1(input: string): string {
    return "";
  }

  public part2(input: string): string {
    return "";
  }
}
