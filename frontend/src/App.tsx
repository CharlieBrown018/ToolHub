import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hub from './components/Hub';
import Scan2PDF from './components/tools/Scan2PDF';
import DocuMark from './components/tools/DocuMark';
import DataValidator from './components/tools/DataValidator';
import ColorPalette from './components/tools/ColorPalette';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/tools/image-to-pdf" element={<Scan2PDF />} />
        <Route path="/tools/md-to-pdf" element={<DocuMark />} />
        <Route path="/tools/data-validator" element={<DataValidator />} />
        <Route path="/tools/color-palette" element={<ColorPalette />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;

