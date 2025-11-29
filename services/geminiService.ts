import { ColorPalette } from "../types";

// AI service has been disabled/removed.
export const generateThemeFromPrompt = async (prompt: string): Promise<Partial<ColorPalette> | null> => {
  console.warn("AI features have been removed from this application.");
  return null;
};