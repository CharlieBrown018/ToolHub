import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RootLayout } from './components/layouts';
import { SearchProvider } from './context/SearchContext';
import Landing from './components/Landing';
import Hub from './components/Hub';
import Scan2PDF from './components/tools/Scan2PDF';
import DocuMark from './components/tools/DocuMark';
import DataValidator from './components/tools/DataValidator';
import ColorPalette from './components/tools/ColorPalette';
import WebPExpress from './components/tools/WebPExpress';
import ShrinkIt from './components/tools/ShrinkIt';
import DiffMaster from './components/tools/DiffMaster';
import SecurePass from './components/tools/SecurePass';
import UnitFlow from './components/tools/UnitFlow';
import QuickQR from './components/tools/QuickQR';
import { GlassToaster } from './components/ui/glass-toast';

function App() {
  return (
    <Router>
      <SearchProvider>
        <RootLayout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/hub" element={<Hub />} />
            <Route path="/tools/image-to-pdf" element={<Scan2PDF />} />
            <Route path="/tools/md-to-pdf" element={<DocuMark />} />
            <Route path="/tools/data-validator" element={<DataValidator />} />
            <Route path="/tools/color-palette" element={<ColorPalette />} />
            <Route path="/tools/webp-express" element={<WebPExpress />} />
            <Route path="/tools/shrink-it" element={<ShrinkIt />} />
            <Route path="/tools/diff-master" element={<DiffMaster />} />
            <Route path="/tools/secure-pass" element={<SecurePass />} />
            <Route path="/tools/unit-flow" element={<UnitFlow />} />
            <Route path="/tools/quick-qr" element={<QuickQR />} />
          </Routes>
        </RootLayout>
        <GlassToaster />
      </SearchProvider>
    </Router>
  );
}

export default App;

