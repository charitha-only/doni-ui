import React, { createContext, useContext, useEffect, useState } from 'react';
import { COLOR_PRESETS, ColorPreset } from './themes';
import { hexToHsl } from '../lib/utils';

export type ThemeMode = 'dark' | 'light';
export type RadiusOption = '0.3rem' | '0.5rem' | '0.75rem' | '1rem' | '1.5rem';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  activePreset: ColorPreset;
  setPreset: (presetId: string) => void;
  customHex: string;
  setCustomHex: (hex: string) => void;
  isCustom: boolean;
  radius: RadiusOption;
  setRadius: (r: RadiusOption) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [activePreset, setActivePresetState] = useState<ColorPreset>(COLOR_PRESETS[0]);
  const [customHex, setCustomHexState] = useState<string>('#8b5cf6');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [radius, setRadius] = useState<RadiusOption>('0.75rem');

  const setPreset = (presetId: string) => {
    const found = COLOR_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setActivePresetState(found);
      setCustomHexState(found.hex);
      setIsCustom(false);
    }
  };

  const setCustomHex = (hex: string) => {
    setCustomHexState(hex);
    setIsCustom(true);
  };

  const toggleMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Sync theme changes to HTML root class and CSS variables
  useEffect(() => {
    const root = document.documentElement;

    // Toggle dark/light class
    if (mode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    // Determine active HSL
    let primaryHsl = activePreset.hsl;
    if (isCustom && customHex) {
      try {
        const { str } = hexToHsl(customHex);
        primaryHsl = str;
      } catch {
        // Fallback to active preset
      }
    }

    // Set dynamic CSS variables
    root.style.setProperty('--primary', primaryHsl);
    root.style.setProperty('--ring', primaryHsl);
    root.style.setProperty('--radius', radius);

    // Adjust theme contrast
    if (mode === 'dark') {
      root.style.setProperty('--background', '224 71% 4%');
      root.style.setProperty('--foreground', '213 31% 91%');
      root.style.setProperty('--card', '224 71% 6%');
      root.style.setProperty('--card-foreground', '213 31% 91%');
      root.style.setProperty('--popover', '224 71% 6%');
      root.style.setProperty('--popover-foreground', '213 31% 91%');
      root.style.setProperty('--secondary', '223 47% 12%');
      root.style.setProperty('--secondary-foreground', '210 40% 98%');
      root.style.setProperty('--muted', '223 47% 11%');
      root.style.setProperty('--muted-foreground', '215 20% 65%');
      root.style.setProperty('--accent', '223 47% 12%');
      root.style.setProperty('--accent-foreground', '210 40% 98%');
      root.style.setProperty('--destructive', '0 84% 60%');
      root.style.setProperty('--destructive-foreground', '210 40% 98%');
      root.style.setProperty('--border', '223 47% 15%');
      root.style.setProperty('--input', '223 47% 15%');
    } else {
      root.style.setProperty('--background', '0 0% 100%');
      root.style.setProperty('--foreground', '222 47% 11%');
      root.style.setProperty('--card', '0 0% 100%');
      root.style.setProperty('--card-foreground', '222 47% 11%');
      root.style.setProperty('--popover', '0 0% 100%');
      root.style.setProperty('--popover-foreground', '222 47% 11%');
      root.style.setProperty('--secondary', '210 40% 96%');
      root.style.setProperty('--secondary-foreground', '222 47% 11%');
      root.style.setProperty('--muted', '210 40% 96%');
      root.style.setProperty('--muted-foreground', '215 16% 47%');
      root.style.setProperty('--accent', '210 40% 96%');
      root.style.setProperty('--accent-foreground', '222 47% 11%');
      root.style.setProperty('--destructive', '0 84% 60%');
      root.style.setProperty('--destructive-foreground', '210 40% 98%');
      root.style.setProperty('--border', '214 32% 91%');
      root.style.setProperty('--input', '214 32% 91%');
    }
  }, [mode, activePreset, isCustom, customHex, radius]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        activePreset,
        setPreset,
        customHex,
        setCustomHex,
        isCustom,
        radius,
        setRadius,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
