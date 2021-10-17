const colorMap: { [key: string]: string } = {
  black: "\u001b[30m",
  brightBlack: "\u001b[30;1m",
  red: "\u001b[31m",
  brightRed: "\u001b[31;1m",
  green: "\u001b[32m",
  brightGreen: "\u001b[32;1m",
  yellow: "\u001b[33m",
  brightYellow: "\u001b[33;1m",
  blue: "\u001b[34m",
  brightBlue: "\u001b[34;1m",
  magenta: "\u001b[35m",
  brightMagenta: "\u001b[35;1m",
  cyan: "\u001b[36m",
  brightCyan: "\u001b[36;1m",
  white: "\u001b[37m",
  brightWhite: "\u001b[37;1m",
  reset: "\u001b[0m",
};

const modificationMap: { [key: string]: string } = {
  bold: "\u001b[1m",
  underline: "\u001b[4m",
  reverse: "\u001b[7m",
}

function colorize(str: string, color: string): string {
  return `${colorMap[color]}${str}${colorMap["reset"]}`;
}

function modify(str: string, color: string): string {
  return `${modificationMap[color]}${str}${colorMap["reset"]}`;
}

const modifiers = {
  bold: function (str: string) {
    return modify(str, "bold");
  },
  underline: function (str: string) {
    return modify(str, "underline");
  },
  reverse: function (str: string) {
    return modify(str, "reverse");
  },
}

const colors = {
  black: function (str: string) {
    return colorize(str, "black");
  },
  brightBlack: function (str: string) {
    return colorize(str, "brightBlack");
  },
  red: function (str: string) {
    return colorize(str, "red");
  },
  brightRed: function (str: string) {
    return colorize(str, "brightRed");
  },
  green: function (str: string) {
    return colorize(str, "green");
  },
  brightGreen: function (str: string) {
    return colorize(str, "brightGreen");
  },
  yellow: function (str: string) {
    return colorize(str, "yellow");
  },
  brightYellow: function (str: string) {
    return colorize(str, "brightYellow");
  },
  blue: function (str: string) {
    return colorize(str, "blue");
  },
  brightBlue: function (str: string) {
    return colorize(str, "brightBlue");
  },
  magenta: function (str: string) {
    return colorize(str, "magenta");
  },
  brightMagenta: function (str: string) {
    return colorize(str, "brightMagenta");
  },
  cyan: function (str: string) {
    return colorize(str, "cyan");
  },
  brightCyan: function (str: string) {
    return colorize(str, "brightCyan");
  },
  white: function (str: string) {
    return colorize(str, "white");
  },
  brightWhite: function (str: string) {
    return colorize(str, "brightWhite");
  },
  ...modifiers
};

export default colors