interface MinecraftTextComponent {
  text: string;
  bold: boolean;
  italic: boolean;
  underlined: boolean;
  strikethrough: boolean;
  obfuscated: boolean;
  color: string;
  extra: MinecraftTextComponent[];
}

export default MinecraftTextComponent;
