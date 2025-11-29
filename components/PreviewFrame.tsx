import React, { useEffect, useRef } from 'react';
import { ColorPalette, GoogleFont } from '../types';
import { MOCK_DASHBOARD_HTML } from '../constants';
import { generateCssVariables } from '../utils/colorUtils';

interface PreviewFrameProps {
  palette: ColorPalette;
  font: GoogleFont;
}

const PreviewFrame: React.FC<PreviewFrameProps> = ({ palette, font }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    // Generate the CSS variables block
    const cssVariables = generateCssVariables(palette, font.family);
    
    // Construct the full HTML with injected styles and fonts
    let docContent = MOCK_DASHBOARD_HTML;
    
    // Inject Fonts
    // We need to fetch the font from Google. 
    // For this mock, we construct the link tag.
    const fontUrl = `https://fonts.googleapis.com/css2?family=${font.name.replace(/\s+/g, '+')}:wght@300;400;500;700&display=swap`;
    const fontLink = font.name !== 'System UI (Default)' 
        ? `<link href="${fontUrl}" rel="stylesheet">` 
        : '';
    
    docContent = docContent.replace('<!-- FONTS_PLACEHOLDER -->', fontLink);
    
    // Inject CSS Vars
    docContent = docContent.replace('/* CSS_VAR_PLACEHOLDER */', cssVariables);

    // Update the srcDoc
    // We use a small timeout or just direct assignment. 
    // Direct assignment is fast enough for React updates.
    iframeRef.current.srcdoc = docContent;

  }, [palette, font]);

  return (
    <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-700">
        <iframe
            ref={iframeRef}
            title="Bootstrap Preview"
            className="w-full h-full bg-white"
            sandbox="allow-scripts"
        />
    </div>
  );
};

export default PreviewFrame;