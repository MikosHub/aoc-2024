export class Exec {
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
