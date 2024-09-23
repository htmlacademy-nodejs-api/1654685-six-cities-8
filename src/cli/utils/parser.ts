const COMMAND_REGEX = /^-{1,2}\w/;

export const parseArgv = (argv: string[]) => {
  const list: [string, string[]][] = [];

  for (const argument of argv) {
    if (COMMAND_REGEX.test(argument)) {
      list.push([argument, []]);
    } else if (list.length && argument) {
      list.at(-1)![1].push(argument);
    }
  }

  return list;
}
