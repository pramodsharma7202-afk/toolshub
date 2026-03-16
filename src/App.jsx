import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import GoogleAnalytics from './components/GoogleAnalytics'
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
import PDFGenerator from './tools/PDFGenerator'
import PDFMerge from './tools/PDFMerge'
import PDFSplit from './tools/PDFSplit'
import PDFCompress from './tools/PDFCompress'
import PDFRotate from './tools/PDFRotate'
import PDFPassword from './tools/PDFPassword'
import PDFWatermark from './tools/PDFWatermark'
import PDFToText from './tools/PDFToText'
import PDFMetadata from './tools/PDFMetadata'
import PDFPageNumbers from './tools/PDFPageNumbers'
import PDFToWord from './tools/PDFToWord'
import PDFToImage from './tools/PDFToImage'
import PDFSign from './tools/PDFSign'
import PDFAnnotate from './tools/PDFAnnotate'
import WordToPDF from './tools/WordToPDF'
import ExcelToPDF from './tools/ExcelToPDF'
import ImageToPDFTool from './tools/ImageToPDFTool'
import WebpageToPDF from './tools/WebpageToPDF'
import WordFormatter from './tools/WordFormatter'
import DocToDocx from './tools/DocToDocx'
import DocxToDoc from './tools/DocxToDoc'
import WordToHTML from './tools/WordToHTML'
import TemplateGenerator from './tools/TemplateGenerator'

function App() {
  const [search, setSearch] = useState('')

  return (
    <BrowserRouter>
      <GoogleAnalytics />
      <Analytics />
      <SpeedInsights />
      <Layout search={search} setSearch={setSearch}>
        <Routes>
          <Route path="/" element={<Home search={search} />} />
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
          <Route path="pdf-generator" element={<PDFGenerator />} />
          <Route path="pdf-merge" element={<PDFMerge />} />
          <Route path="pdf-split" element={<PDFSplit />} />
          <Route path="pdf-compress" element={<PDFCompress />} />
          <Route path="pdf-rotate" element={<PDFRotate />} />
          <Route path="pdf-password" element={<PDFPassword />} />
          <Route path="pdf-watermark" element={<PDFWatermark />} />
          <Route path="pdf-to-text" element={<PDFToText />} />
          <Route path="pdf-metadata" element={<PDFMetadata />} />
          <Route path="pdf-page-numbers" element={<PDFPageNumbers />} />
          <Route path="pdf-to-word" element={<PDFToWord />} />
          <Route path="pdf-to-image" element={<PDFToImage />} />
          <Route path="pdf-sign" element={<PDFSign />} />
          <Route path="pdf-annotate" element={<PDFAnnotate />} />
          <Route path="word-to-pdf" element={<WordToPDF />} />
          <Route path="excel-to-pdf" element={<ExcelToPDF />} />
          <Route path="image-to-pdf" element={<ImageToPDFTool />} />
          <Route path="webpage-to-pdf" element={<WebpageToPDF />} />
          <Route path="word-formatter" element={<WordFormatter />} />
          <Route path="doc-to-docx" element={<DocToDocx />} />
          <Route path="docx-to-doc" element={<DocxToDoc />} />
          <Route path="word-to-html" element={<WordToHTML />} />
          <Route path="template-generator" element={<TemplateGenerator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
