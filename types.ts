export interface ColorPalette {
  primary: string;
  secondary: string;
  success: string;
  info: string;
  warning: string;
  danger: string;
  light: string;
  dark: string;
  bodyBg: string;
  bodyColor: string;
  [key: string]: string;
}

export interface LockedColors {
  [key: string]: boolean;
}

export interface GoogleFont {
  name: string;
  family: string;
}

export interface ThemeConfig {
  palette: ColorPalette;
  font: GoogleFont;
}
