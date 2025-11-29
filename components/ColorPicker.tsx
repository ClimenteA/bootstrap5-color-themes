import React from 'react';

interface ColorPickerProps {
  label: string;
  colorKey: string;
  color: string;
  isLocked: boolean;
  onColorChange: (key: string, color: string) => void;
  onToggleLock: (key: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  colorKey,
  color,
  isLocked,
  onColorChange,
  onToggleLock,
}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg mb-2 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-lg border-2 border-gray-600">
          <input
            type="color"
            value={color}
            onChange={(e) => onColorChange(colorKey, e.target.value)}
            className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer opacity-0"
            title="Choose color"
          />
          <div 
            className="w-full h-full"
            style={{ backgroundColor: color }}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-200 capitalize">{label}</span>
          <span className="text-xs text-gray-400 font-mono uppercase">{color}</span>
        </div>
      </div>
      <button
        onClick={() => onToggleLock(colorKey)}
        className={`p-2 rounded-md transition-colors ${
          isLocked 
            ? 'text-red-400 bg-red-900/30 hover:bg-red-900/50' 
            : 'text-gray-500 hover:text-gray-300 hover:bg-gray-700'
        }`}
        title={isLocked ? "Unlock color" : "Lock color"}
      >
        {isLocked ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ColorPicker;