import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import QRCodeGenerator from './tools/QRCodeGenerator'
import PasswordGenerator from './tools/PasswordGenerator'
import WordCounter from './tools/WordCounter'
import TextCaseConverter from './tools/TextCaseConverter'
import LoremIpsumGenerator from './tools/LoremIpsumGenerator'
import RandomNumberGenerator from './tools/RandomNumberGenerator'
import ColorPaletteGenerator from './tools/ColorPaletteGenerator'
import CSSGradientGenerator from './tools/CSSGradientGenerator'
import JSONFormatter from './tools/JSONFormatter'
import Base64Encoder from './tools/Base64Encoder'
import ImageResizer from './tools/ImageResizer'
import ImageToPNG from './tools/ImageToPNG'
import ImageToJPG from './tools/ImageToJPG'
import ImageCompressor from './tools/ImageCompressor'
import UUIDGenerator from './tools/UUIDGenerator'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="qr-generator" element={<QRCodeGenerator />} />
          <Route path="password-generator" element={<PasswordGenerator />} />
          <Route path="word-counter" element={<WordCounter />} />
          <Route path="text-case-converter" element={<TextCaseConverter />} />
          <Route path="lorem-ipsum-generator" element={<LoremIpsumGenerator />} />
          <Route path="random-number-generator" element={<RandomNumberGenerator />} />
          <Route path="color-palette-generator" element={<ColorPaletteGenerator />} />
          <Route path="css-gradient-generator" element={<CSSGradientGenerator />} />
          <Route path="json-formatter" element={<JSONFormatter />} />
          <Route path="base64-encoder" element={<Base64Encoder />} />
          <Route path="image-resizer" element={<ImageResizer />} />
          <Route path="image-to-png" element={<ImageToPNG />} />
          <Route path="image-to-jpg" element={<ImageToJPG />} />
          <Route path="image-compressor" element={<ImageCompressor />} />
          <Route path="uuid-generator" element={<UUIDGenerator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
