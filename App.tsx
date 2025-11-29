import React, { useState, useCallback } from 'react';
import { ColorPalette, LockedColors, GoogleFont } from './types';
import { DEFAULT_PALETTE, GOOGLE_FONTS } from './constants';
import { generateSmartPalette, generateCssVariables, hexToHsl, isValidHex } from './utils/colorUtils';
import ColorPicker from './components/ColorPicker';
import PreviewFrame from './components/PreviewFrame';

const App: React.FC = () => {
  const [palette, setPalette] = useState<ColorPalette>(DEFAULT_PALETTE);
  const [locked, setLocked] = useState<LockedColors>({});
  const [selectedFont, setSelectedFont] = useState<GoogleFont>(GOOGLE_FONTS[0]);
  const [importInputValue, setImportInputValue] = useState('');
  const [importError, setImportError] = useState('');

  const handleColorChange = (key: string, color: string) => {
    setPalette((prev) => ({ ...prev, [key]: color }));
  };

  const handleToggleLock = (key: string) => {
    setLocked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRandomize = useCallback(() => {
    const newPalette = generateSmartPalette(palette, locked);
    setPalette(newPalette);
  }, [palette, locked]);

  const handleExport = () => {
    const cssContent = generateCssVariables(palette, selectedFont.family);
    const blob = new Blob([cssContent], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bootstrap-theme.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportColors = () => {
    setImportError('');
    // Parse input: handle JSON array or comma separated strings
    let colors: string[] = [];
    try {
      // Try parsing as JSON
      if (importInputValue.trim().startsWith('[')) {
        colors = JSON.parse(importInputValue);
      } else {
        // Try splitting by comma or newline
        colors = importInputValue.split(/[\n,]+/).map(c => c.trim()).filter(c => c);
      }
    } catch (e) {
      setImportError('Invalid format. Please use a JSON array or comma-separated hex codes.');
      return;
    }

    // Validate and format hex codes
    const validColors = colors
      .map(c => c.startsWith('#') ? c : '#' + c)
      .filter(c => isValidHex(c));

    if (validColors.length === 0) {
      setImportError('No valid hex codes found.');
      return;
    }

    // Smart Assignment Logic
    // Treat all imported colors as candidates for Brand Colors.
    // We do NOT touch neutrals (light, dark, bodyBg, bodyColor) as requested.
    
    const brandCandidates = validColors.map(hex => ({
      hex,
      hsl: hexToHsl(hex)
    }));

    const newPalette = { ...palette };
    const usedIndices = new Set<number>();

    const findAndAssign = (minH: number, maxH: number, key: keyof ColorPalette) => {
      if (locked[key]) return;
      
      let bestIdx = -1;
      
      // Simple first-found matching strategy for the requested hue range
      brandCandidates.forEach((c, idx) => {
        if (usedIndices.has(idx)) return;
        if (bestIdx !== -1) return; // Already found one for this slot

        let h = c.hsl.h;
        // Normalize for Red wrap-around (330 to 20)
        if (minH > maxH) { 
            // Range crosses 360/0 boundary (e.g., 330...360...20)
            if (h >= minH || h <= maxH) {
                bestIdx = idx;
            }
        } else {
            // Standard range
            if (h >= minH && h <= maxH) {
                bestIdx = idx;
            }
        }
      });

      if (bestIdx !== -1) {
        newPalette[key] = brandCandidates[bestIdx].hex;
        usedIndices.add(bestIdx);
      }
    };

    // Assign specific semantics first based on Hue
    findAndAssign(330, 20, 'danger'); // Red
    findAndAssign(70, 160, 'success'); // Green
    findAndAssign(30, 70, 'warning'); // Yellow/Orange
    findAndAssign(180, 240, 'info'); // Cyan/Light Blue

    // Remaining brand colors go to Primary / Secondary
    // We look for any colors that haven't been used yet
    const remaining = brandCandidates.filter((_, i) => !usedIndices.has(i));
    
    if (remaining.length > 0 && !locked['primary']) {
      newPalette.primary = remaining[0].hex;
    }
    if (remaining.length > 1 && !locked['secondary']) {
       newPalette.secondary = remaining[1].hex;
    } 
    
    // Note: Neutrals (Light, Dark, BodyBg, BodyColor) are intentionally left untouched.
    
    setPalette(newPalette);
    setImportInputValue('');
  };

  // Groups for UI rendering
  const mainColors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];
  const neutralColors = ['light', 'dark', 'bodyBg', 'bodyColor'];

  return (
    <div className="flex h-screen w-full bg-gray-900 text-gray-100 font-sans">
      {/* Sidebar Controls */}
      <aside className="w-96 flex-shrink-0 flex flex-col border-r border-gray-800 bg-gray-900 z-10 shadow-xl">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Bootstrap Theme Generator
          </h1>
          <p className="text-xs text-gray-500 mt-1">Customize your Bootstrap 5 theme</p>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            <div className="space-y-8">
               {/* Quick Actions */}
               <button
                onClick={handleRandomize}
                className="w-full py-2 px-4 bg-gray-800 border border-gray-600 rounded-lg text-blue-400 font-semibold hover:bg-gray-700 hover:border-blue-400 transition-all flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Randomize Unlocked
              </button>

              {/* Import Section */}
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Import from Coolors</h3>
                  <textarea
                    className="w-full bg-gray-900 text-xs text-gray-300 rounded border border-gray-600 p-2 mb-2 focus:ring-1 focus:ring-blue-500 outline-none font-mono h-20 resize-none"
                    placeholder='["#000000", "#ffffff", ...]'
                    value={importInputValue}
                    onChange={(e) => setImportInputValue(e.target.value)}
                  />
                  {importError && <p className="text-red-400 text-xs mb-2">{importError}</p>}
                  <button 
                    onClick={handleImportColors}
                    className="w-full py-1.5 bg-blue-600/80 hover:bg-blue-600 text-white text-xs font-medium rounded transition-colors"
                  >
                    Import Palette
                  </button>
              </div>

              {/* Fonts */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Typography</h3>
                <select
                    className="w-full bg-gray-800 text-white text-sm rounded-lg border border-gray-700 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedFont.name}
                    onChange={(e) => {
                        const font = GOOGLE_FONTS.find(f => f.name === e.target.value);
                        if (font) setSelectedFont(font);
                    }}
                >
                    {GOOGLE_FONTS.map((font) => (
                        <option key={font.name} value={font.name}>{font.name}</option>
                    ))}
                </select>
              </div>

              {/* Theme Colors */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Brand Colors</h3>
                {mainColors.map((key) => (
                  <ColorPicker
                    key={key}
                    label={key}
                    colorKey={key}
                    color={palette[key]}
                    isLocked={!!locked[key]}
                    onColorChange={handleColorChange}
                    onToggleLock={handleToggleLock}
                  />
                ))}
              </div>

              {/* Neutral Colors */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Neutrals & Backgrounds</h3>
                {neutralColors.map((key) => (
                  <ColorPicker
                    key={key}
                    label={key === 'bodyBg' ? 'Body Background' : key === 'bodyColor' ? 'Body Text' : key}
                    colorKey={key}
                    color={palette[key]}
                    isLocked={!!locked[key]}
                    onColorChange={handleColorChange}
                    onToggleLock={handleToggleLock}
                  />
                ))}
              </div>
            </div>
        </div>
        
        <div className="p-4 border-t border-gray-800 bg-gray-900">
             <button
                onClick={handleExport}
                className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Export CSS
              </button>
        </div>
      </aside>

      {/* Main Preview Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-gray-950">
        <header className="h-16 flex items-center justify-between px-6 border-b border-gray-800 bg-gray-900">
            <h2 className="font-semibold text-gray-200">Live Preview <span className="text-xs font-normal text-gray-500 ml-2">(Bootstrap 5.3)</span></h2>
            <div className="flex items-center gap-2">
                 <span className="w-3 h-3 rounded-full bg-red-500"></span>
                 <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                 <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
        </header>
        <div className="flex-1 p-8 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
            <PreviewFrame palette={palette} font={selectedFont} />
        </div>
      </main>
    </div>
  );
};

export default App;