import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RootLayout } from './components/layouts';
import Hub from './components/Hub';
import Scan2PDF from './components/tools/Scan2PDF';
import DocuMark from './components/tools/DocuMark';
import DataValidator from './components/tools/DataValidator';
import ColorPalette from './components/tools/ColorPalette';
import { GlassToaster } from './components/ui/glass-toast';

function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Hub />} />
          <Route path="/tools/image-to-pdf" element={<Scan2PDF />} />
          <Route path="/tools/md-to-pdf" element={<DocuMark />} />
          <Route path="/tools/data-validator" element={<DataValidator />} />
          <Route path="/tools/color-palette" element={<ColorPalette />} />
        </Routes>
      </RootLayout>
      <GlassToaster />
    </Router>
  );
}

export default App;

