import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import GoogleAnalytics from './components/GoogleAnalytics'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const QRCodeGenerator = lazy(() => import('./tools/QRCodeGenerator'))
const PasswordGenerator = lazy(() => import('./tools/PasswordGenerator'))
const WordCounter = lazy(() => import('./tools/WordCounter'))
const TextCaseConverter = lazy(() => import('./tools/TextCaseConverter'))
const LoremIpsumGenerator = lazy(() => import('./tools/LoremIpsumGenerator'))
const RandomNumberGenerator = lazy(() => import('./tools/RandomNumberGenerator'))
const ColorPaletteGenerator = lazy(() => import('./tools/ColorPaletteGenerator'))
const CSSGradientGenerator = lazy(() => import('./tools/CSSGradientGenerator'))
const JSONFormatter = lazy(() => import('./tools/JSONFormatter'))
const Base64Encoder = lazy(() => import('./tools/Base64Encoder'))
const ImageResizer = lazy(() => import('./tools/ImageResizer'))
const ImageToPNG = lazy(() => import('./tools/ImageToPNG'))
const ImageToJPG = lazy(() => import('./tools/ImageToJPG'))
const ImageCompressor = lazy(() => import('./tools/ImageCompressor'))
const UUIDGenerator = lazy(() => import('./tools/UUIDGenerator'))
const PDFGenerator = lazy(() => import('./tools/PDFGenerator'))
const PDFMerge = lazy(() => import('./tools/PDFMerge'))
const PDFSplit = lazy(() => import('./tools/PDFSplit'))
const PDFCompress = lazy(() => import('./tools/PDFCompress'))
const PDFRotate = lazy(() => import('./tools/PDFRotate'))
const PDFPassword = lazy(() => import('./tools/PDFPassword'))
const PDFWatermark = lazy(() => import('./tools/PDFWatermark'))
const PDFToText = lazy(() => import('./tools/PDFToText'))
const PDFMetadata = lazy(() => import('./tools/PDFMetadata'))
const PDFPageNumbers = lazy(() => import('./tools/PDFPageNumbers'))
const PDFToWord = lazy(() => import('./tools/PDFToWord'))
const PDFToImage = lazy(() => import('./tools/PDFToImage'))
const PDFSign = lazy(() => import('./tools/PDFSign'))
const PDFAnnotate = lazy(() => import('./tools/PDFAnnotate'))
const WordToPDF = lazy(() => import('./tools/WordToPDF'))
const ExcelToPDF = lazy(() => import('./tools/ExcelToPDF'))
const ImageToPDFTool = lazy(() => import('./tools/ImageToPDFTool'))
const WebpageToPDF = lazy(() => import('./tools/WebpageToPDF'))
const WordFormatter = lazy(() => import('./tools/WordFormatter'))
const DocToDocx = lazy(() => import('./tools/DocToDocx'))
const DocxToDoc = lazy(() => import('./tools/DocxToDoc'))
const WordToHTML = lazy(() => import('./tools/WordToHTML'))
const TemplateGenerator = lazy(() => import('./tools/TemplateGenerator'))

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500">Loading tool...</p>
      </div>
    </div>
  )
}

function App() {
  const [search, setSearch] = useState('')

  return (
    <BrowserRouter>
      <GoogleAnalytics />
      <Analytics />
      <SpeedInsights />
      <Layout search={search} setSearch={setSearch}>
        <Suspense fallback={<LoadingFallback />}>
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
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

export default App
