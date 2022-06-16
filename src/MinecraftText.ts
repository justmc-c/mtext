import MinecraftColor from './MinecraftColor';
import MinecraftTextComponent from './MinecraftTextComponent';

interface MinecraftStyled {
  bold: boolean;
  italic: boolean;
  underlined: boolean;
  strikethrough: boolean;
  obfuscated: boolean;
}

type MinecraftStyle = keyof MinecraftStyled;

class MinecraftText implements MinecraftStyled {
  constructor(public content: string = '') {}

  public bold: boolean = false;
  public italic: boolean = false;
  public underlined: boolean = false;
  public strikethrough: boolean = false;
  public obfuscated: boolean = false;

  public color: MinecraftColor = MinecraftColor.WHITE;

  public children: MinecraftText[] = [];

  public toJson(): MinecraftTextComponent {
    const component = {
      text: this.content,
      color: this.color.toString(),
    } as MinecraftTextComponent;

    if (this.children.length > 0)
      component.extra = this.children.map((child) => child.toJson());

    component.italic = this.italic;
    if (this.bold) component.bold = true;
    if (this.underlined) component.underlined = true;
    if (this.strikethrough) component.strikethrough = true;
    if (this.obfuscated) component.obfuscated = true;

    return component;
  }

  public toJsonString(): string {
    return JSON.stringify(this.toJson());
  }

  public copyStyles(other: MinecraftText) {
    this.bold = other.bold;
    this.italic = other.italic;
    this.underlined = other.underlined;
    this.strikethrough = other.strikethrough;
    this.obfuscated = other.obfuscated;
    this.color = other.color;
  }

  static AMPERSAND = '&';
  static PARAGRAPH = '§';

  static STYLES: { [key: string]: MinecraftStyle } = {
    k: 'obfuscated',
    l: 'bold',
    m: 'strikethrough',
    n: 'underlined',
    o: 'italic',
  };

  static from(
    string: string,
    styleChar = MinecraftText.AMPERSAND
  ): MinecraftText {
    const initial = new MinecraftText();
    let current = initial;

    const apply = (block: () => void) => {
      if (current.content === '') {
        block();
      } else {
        const child = new MinecraftText();
        child.copyStyles(current);
        current.children.push(child);
        current = child;
        block();
      }
    };

    const color = (color: MinecraftColor) => {
      apply(() => {
        current.color = color;
        (Object.values(MinecraftText.STYLES) as MinecraftStyle[]).forEach(
          (key) => (current[key] = false)
        );
      });
    };

    for (let i = 0; i < string.length; i++) {
      const char = string[i];

      if (char === styleChar) {
        const nextChar = string[++i];

        if (Object.keys(MinecraftColor.COLORS).includes(nextChar)) {
          color(MinecraftColor.COLORS[nextChar]);

          continue;
        }

        if (nextChar === '#') {
          const nextSixCharacters = string.substring(i + 1, i + 7);
          if (MinecraftColor.isHex(nextSixCharacters)) {
            color(MinecraftColor.from(nextSixCharacters));
            i += 6;

            continue;
          }
        }

        if (nextChar === 'r') {
          color(MinecraftColor.WHITE);

          continue;
        }

        if (Object.keys(MinecraftText.STYLES).includes(nextChar)) {
          apply(() => {
            current[MinecraftText.STYLES[nextChar]] = true;
          });

          continue;
        }

        current.content += `${char}${nextChar}`;
        continue;
      }

      current.content += char;
    }

    return initial;
  }
}

export default MinecraftText;
