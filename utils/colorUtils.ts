import { ColorPalette, LockedColors } from '../types';

// Helper to convert hex to RGB object
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

// Helper to convert hex to HSL
export const hexToHsl = (hex: string): { h: number; s: number; l: number } => {
  const { r: r255, g: g255, b: b255 } = hexToRgb(hex);
  const r = r255 / 255, g = g255 / 255, b = b255 / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
};

// Get luminance of a hex color
export const getLuminance = (hex: string): number => {
  const { r, g, b } = hexToRgb(hex);
  const [rs, gs, bs] = [r, g, b].map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

export const isValidHex = (hex: string): boolean => {
  return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
};

// Convert hex to CSS rgb string "123, 45, 67"
export const hexToRgbString = (hex: string): string => {
  const { r, g, b } = hexToRgb(hex);
  return `${r}, ${g}, ${b}`;
};

// Darken a hex color by a percentage (0-1)
const darkenHex = (hex: string, amount: number): string => {
    let { r, g, b } = hexToRgb(hex);
    r = Math.max(0, Math.floor(r * (1 - amount)));
    g = Math.max(0, Math.floor(g * (1 - amount)));
    b = Math.max(0, Math.floor(b * (1 - amount)));
    const componentToHex = (c: number) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

// Simple HSL to Hex for algorithmic generation
const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

/**
 * Generates a palette based on a random hue or existing locked colors.
 * Implements simple color theory (Triadic/Complementary mixes).
 */
export const generateSmartPalette = (
  currentPalette: ColorPalette,
  locked: LockedColors
): ColorPalette => {
  const newPalette = { ...currentPalette };
  const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  let baseHue: number;

  // Determine base hue: either from locked primary or random
  if (locked['primary']) {
    const hsl = hexToHsl(currentPalette.primary);
    baseHue = hsl.h;
  } else {
    baseHue = random(0, 360);
    // Generate Primary
    newPalette.primary = hslToHex(baseHue, random(60, 90), random(45, 60));
  }

  // Generate Secondary (Complementary or Split Complementary with variation)
  if (!locked['secondary']) {
    // Shift approx 180 degrees for contrast, or slightly off for interest
    const shift = Math.random() > 0.6 ? 180 : 210; 
    newPalette.secondary = hslToHex((baseHue + shift) % 360, random(10, 30), random(50, 70)); 
  }

  // Generate Info (Usually Cyan/Blue, randomized within range)
  if (!locked['info']) {
    // Randomize within Blue-Cyan range (180-220)
    newPalette.info = hslToHex(random(180, 220), random(70, 90), random(50, 60));
  }

  // Generate Success (Greenish range 130-160)
  if (!locked['success']) {
    newPalette.success = hslToHex(random(130, 160), random(60, 85), random(40, 50)); 
  }

  // Generate Warning (Yellow/Orange range 35-55)
  if (!locked['warning']) {
     newPalette.warning = hslToHex(random(35, 55), random(80, 100), random(50, 60));
  }

  // Generate Danger (Red range 345-360-15)
  if (!locked['danger']) {
    let h = random(345, 375);
    if (h > 360) h -= 360; // Wrap around for pure reds
    newPalette.danger = hslToHex(h, random(70, 90), random(50, 60));
  }

  // Light - very light grey/white with slight tint of base hue
  if (!locked['light']) {
    newPalette.light = hslToHex(baseHue, random(5, 20), random(94, 98));
  }

  // Dark - very dark grey with slight tint of base hue
  if (!locked['dark']) {
    newPalette.dark = hslToHex(baseHue, random(10, 25), random(15, 25));
  }
  
  // Body logic
  if (!locked['bodyBg']) {
      newPalette.bodyBg = '#ffffff'; // Keep body white for standard usability, or very faint tint
  }
  if (!locked['bodyColor']) {
      newPalette.bodyColor = hslToHex(baseHue, random(5, 15), random(15, 25));
  }

  return newPalette;
};


export const generateCssVariables = (palette: ColorPalette, fontFamily: string): string => {
  // Calculate darkened versions for hover states
  const primaryHover = darkenHex(palette.primary, 0.1);
  const secondaryHover = darkenHex(palette.secondary, 0.1);
  const successHover = darkenHex(palette.success, 0.1);
  const infoHover = darkenHex(palette.info, 0.1);
  const warningHover = darkenHex(palette.warning, 0.1);
  const dangerHover = darkenHex(palette.danger, 0.1);

  return `
:root {
  --bs-blue: #0d6efd;
  --bs-indigo: #6610f2;
  --bs-purple: #6f42c1;
  --bs-pink: #d63384;
  --bs-red: #dc3545;
  --bs-orange: #fd7e14;
  --bs-yellow: #ffc107;
  --bs-green: #198754;
  --bs-teal: #20c997;
  --bs-cyan: #0dcaf0;
  --bs-black: #000;
  --bs-white: #fff;
  --bs-gray: #6c757d;
  --bs-gray-dark: #343a40;
  --bs-gray-100: #f8f9fa;
  --bs-gray-200: #e9ecef;
  --bs-gray-300: #dee2e6;
  --bs-gray-400: #ced4da;
  --bs-gray-500: #adb5bd;
  --bs-gray-600: #6c757d;
  --bs-gray-700: #495057;
  --bs-gray-800: #343a40;
  --bs-gray-900: #212529;

  --bs-primary: ${palette.primary};
  --bs-secondary: ${palette.secondary};
  --bs-success: ${palette.success};
  --bs-info: ${palette.info};
  --bs-warning: ${palette.warning};
  --bs-danger: ${palette.danger};
  --bs-light: ${palette.light};
  --bs-dark: ${palette.dark};
  
  --bs-primary-rgb: ${hexToRgbString(palette.primary)};
  --bs-secondary-rgb: ${hexToRgbString(palette.secondary)};
  --bs-success-rgb: ${hexToRgbString(palette.success)};
  --bs-info-rgb: ${hexToRgbString(palette.info)};
  --bs-warning-rgb: ${hexToRgbString(palette.warning)};
  --bs-danger-rgb: ${hexToRgbString(palette.danger)};
  --bs-light-rgb: ${hexToRgbString(palette.light)};
  --bs-dark-rgb: ${hexToRgbString(palette.dark)};
  
  --bs-body-color: ${palette.bodyColor};
  --bs-body-bg: ${palette.bodyBg};
  --bs-body-color-rgb: ${hexToRgbString(palette.bodyColor)};
  --bs-body-bg-rgb: ${hexToRgbString(palette.bodyBg)};
  
  --bs-font-sans-serif: ${fontFamily};
  --bs-body-font-family: var(--bs-font-sans-serif);
  
  --bs-link-color: ${palette.primary};
  --bs-link-hover-color: ${primaryHover}; 
  --bs-border-color: #dee2e6;
}

/* Bootstrap Component Overrides to force usage of variables */

/* Background Utilities with Opacity Support */
.bg-primary { background-color: rgba(var(--bs-primary-rgb), var(--bs-bg-opacity, 1)) !important; }
.bg-secondary { background-color: rgba(var(--bs-secondary-rgb), var(--bs-bg-opacity, 1)) !important; }
.bg-success { background-color: rgba(var(--bs-success-rgb), var(--bs-bg-opacity, 1)) !important; }
.bg-info { background-color: rgba(var(--bs-info-rgb), var(--bs-bg-opacity, 1)) !important; }
.bg-warning { background-color: rgba(var(--bs-warning-rgb), var(--bs-bg-opacity, 1)) !important; }
.bg-danger { background-color: rgba(var(--bs-danger-rgb), var(--bs-bg-opacity, 1)) !important; }
.bg-light { background-color: rgba(var(--bs-light-rgb), var(--bs-bg-opacity, 1)) !important; }
.bg-dark { background-color: rgba(var(--bs-dark-rgb), var(--bs-bg-opacity, 1)) !important; }

/* Text Utilities with Opacity Support */
.text-primary { color: rgba(var(--bs-primary-rgb), var(--bs-text-opacity, 1)) !important; }
.text-secondary { color: rgba(var(--bs-secondary-rgb), var(--bs-text-opacity, 1)) !important; }
.text-success { color: rgba(var(--bs-success-rgb), var(--bs-text-opacity, 1)) !important; }
.text-info { color: rgba(var(--bs-info-rgb), var(--bs-text-opacity, 1)) !important; }
.text-warning { color: rgba(var(--bs-warning-rgb), var(--bs-text-opacity, 1)) !important; }
.text-danger { color: rgba(var(--bs-danger-rgb), var(--bs-text-opacity, 1)) !important; }
.text-light { color: rgba(var(--bs-light-rgb), var(--bs-text-opacity, 1)) !important; }
.text-dark { color: rgba(var(--bs-dark-rgb), var(--bs-text-opacity, 1)) !important; }

/* Buttons */
.btn-primary {
  --bs-btn-bg: ${palette.primary};
  --bs-btn-border-color: ${palette.primary};
  --bs-btn-hover-bg: ${primaryHover};
  --bs-btn-hover-border-color: ${primaryHover};
  --bs-btn-active-bg: ${primaryHover};
  --bs-btn-active-border-color: ${primaryHover};
  --bs-btn-disabled-bg: ${palette.primary};
  --bs-btn-disabled-border-color: ${palette.primary};
}

.btn-secondary {
  --bs-btn-bg: ${palette.secondary};
  --bs-btn-border-color: ${palette.secondary};
  --bs-btn-hover-bg: ${secondaryHover};
  --bs-btn-hover-border-color: ${secondaryHover};
  --bs-btn-active-bg: ${secondaryHover};
  --bs-btn-active-border-color: ${secondaryHover};
}

.btn-success {
  --bs-btn-bg: ${palette.success};
  --bs-btn-border-color: ${palette.success};
  --bs-btn-hover-bg: ${successHover};
  --bs-btn-hover-border-color: ${successHover};
}

.btn-danger {
  --bs-btn-bg: ${palette.danger};
  --bs-btn-border-color: ${palette.danger};
  --bs-btn-hover-bg: ${dangerHover};
  --bs-btn-hover-border-color: ${dangerHover};
}

.btn-warning {
  --bs-btn-bg: ${palette.warning};
  --bs-btn-border-color: ${palette.warning};
  --bs-btn-hover-bg: ${warningHover};
  --bs-btn-hover-border-color: ${warningHover};
}

.btn-info {
  --bs-btn-bg: ${palette.info};
  --bs-btn-border-color: ${palette.info};
  --bs-btn-hover-bg: ${infoHover};
  --bs-btn-hover-border-color: ${infoHover};
}

/* Outline Buttons */
.btn-outline-primary {
  --bs-btn-color: ${palette.primary};
  --bs-btn-border-color: ${palette.primary};
  --bs-btn-hover-bg: ${palette.primary};
  --bs-btn-active-bg: ${palette.primary};
}

/* List Groups */
.list-group-item.active {
  background-color: var(--bs-primary) !important;
  border-color: var(--bs-primary) !important;
  color: #fff !important;
}

/* Form Controls */
.form-control:focus {
  border-color: ${palette.primary};
  box-shadow: 0 0 0 0.25rem rgba(${hexToRgbString(palette.primary)}, 0.25);
}

.form-check-input:checked {
  background-color: ${palette.primary};
  border-color: ${palette.primary};
}

/* Navbar */
.navbar-dark .navbar-nav .nav-link.active {
    color: #fff;
}
  `;
};