export const colorOf = (r: number, g: number, b: number, name?: string) => {
  return new MinecraftColor(r, g, b, name);
};

class MinecraftColor {
  constructor(
    public r: number,
    public g: number,
    public b: number,
    public name?: string
  ) {}

  public toString() {
    return (
      this.name ||
      `#${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(16)}`
    );
  }

  static BLACK = colorOf(0, 0, 0, 'black');
  static DARK_BLUE = colorOf(0, 0, 170, 'dark_blue');
  static DARK_GREEN = colorOf(0, 170, 0, 'dark_green');
  static DARK_AQUA = colorOf(0, 170, 170, 'dark_aqua');
  static DARK_RED = colorOf(170, 0, 0, 'dark_red');
  static DARK_PURPLE = colorOf(170, 0, 170, 'dark_purple');
  static GOLD = colorOf(255, 170, 0, 'gold');
  static GRAY = colorOf(170, 170, 170, 'gray');
  static DARK_GRAY = colorOf(85, 85, 85, 'dark_gray');
  static BLUE = colorOf(85, 85, 255, 'blue');
  static GREEN = colorOf(85, 255, 85, 'green');
  static AQUA = colorOf(85, 255, 255, 'aqua');
  static RED = colorOf(255, 85, 85, 'red');
  static PURPLE = colorOf(255, 85, 255, 'purple');
  static YELLOW = colorOf(255, 255, 85, 'yellow');
  static WHITE = colorOf(255, 255, 255, 'white');

  static COLORS: {
    [key: string]: MinecraftColor;
  } = {
    '0': MinecraftColor.BLACK,
    '1': MinecraftColor.DARK_BLUE,
    '2': MinecraftColor.DARK_GREEN,
    '3': MinecraftColor.DARK_AQUA,
    '4': MinecraftColor.DARK_RED,
    '5': MinecraftColor.DARK_PURPLE,
    '6': MinecraftColor.GOLD,
    '7': MinecraftColor.GRAY,
    '8': MinecraftColor.DARK_GRAY,
    '9': MinecraftColor.BLUE,
    a: MinecraftColor.GREEN,
    b: MinecraftColor.AQUA,
    c: MinecraftColor.RED,
    d: MinecraftColor.PURPLE,
    e: MinecraftColor.YELLOW,
    f: MinecraftColor.WHITE,
  };

  static isHex(string: string) {
    return /[0-9A-Fa-f]{6}/.test(string);
  }

  static from(hex: string) {
    const [r, g, b] = hex.match(/\w\w/g)!.map((v) => parseInt(v, 16));

    return colorOf(r, g, b);
  }
}

export default MinecraftColor;
