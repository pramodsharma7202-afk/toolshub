import { Link } from 'react-router-dom'

const pdfTools = [
  { path: '/pdf-generator', name: 'PDF Generator', description: 'Create PDFs from text, HTML, or uploaded files', icon: '📄' },
  { path: '/word-to-pdf', name: 'Word to PDF', description: 'Convert .doc or .docx files to PDF', icon: '📝' },
  { path: '/excel-to-pdf', name: 'Excel to PDF', description: 'Export spreadsheets as PDFs', icon: '📊' },
  { path: '/image-to-pdf', name: 'Image to PDF', description: 'Convert JPG, PNG, or other images into PDF', icon: '🖼️' },
  { path: '/webpage-to-pdf', name: 'Webpage to PDF', description: 'Convert a URL or HTML page into a PDF', icon: '🌐' },
  { path: '/pdf-merge', name: 'PDF Merge', description: 'Combine multiple PDFs into one file', icon: '🔗' },
  { path: '/pdf-split', name: 'PDF Split', description: 'Extract specific pages or split PDFs', icon: '✂️' },
  { path: '/pdf-compress', name: 'PDF Compress', description: 'Reduce file size for faster sharing', icon: '📉' },
  { path: '/pdf-rotate', name: 'PDF Rotate', description: 'Rotate pages or reorder them easily', icon: '🔄' },
  { path: '/pdf-password', name: 'PDF Password', description: 'Add or remove passwords from PDFs', icon: '🔒' },
  { path: '/pdf-watermark', name: 'PDF Watermark', description: 'Add text or image watermark', icon: '💧' },
  { path: '/pdf-to-word', name: 'PDF to Word', description: 'Extract content into editable Word formats', icon: '📃' },
  { path: '/pdf-to-image', name: 'PDF to Image', description: 'Extract pages as JPG or PNG', icon: '🖼️' },
  { path: '/pdf-to-text', name: 'PDF to Text', description: 'Get raw text from a PDF file', icon: '📝' },
  { path: '/pdf-metadata', name: 'PDF Metadata', description: 'View/edit title, author, and other metadata', icon: 'ℹ️' },
  { path: '/pdf-page-numbers', name: 'PDF Page Numbers', description: 'Add page numbers to PDFs', icon: '#️⃣' },
  { path: '/pdf-sign', name: 'Sign PDF', description: 'Add digital signatures', icon: '✍️' },
  { path: '/pdf-annotate', name: 'Annotate PDF', description: 'Highlight, comment, or draw on PDF pages', icon: '🖍️' },
]

const wordTools = [
  { path: '/word-formatter', name: 'Word Formatter', description: 'Remove extra spaces, line breaks, or formatting', icon: '🧹' },
  { path: '/doc-to-docx', name: 'DOC to DOCX', description: 'Convert DOC to DOCX format', icon: '🔄' },
  { path: '/docx-to-doc', name: 'DOCX to DOC', description: 'Convert DOCX to DOC format', icon: '🔄' },
  { path: '/word-to-html', name: 'Word to HTML', description: 'Export Word document to HTML code', icon: '🌐' },
  { path: '/template-generator', name: 'Template Generator', description: 'Create resumes, letters, invoices, or reports', icon: '📋' },
]

const otherTools = [
  { path: '/qr-generator', name: 'QR Generator', description: 'Generate QR codes from text or URLs', icon: '⬜' },
  { path: '/password-generator', name: 'Password Generator', description: 'Generate secure random passwords', icon: '🔐' },
  { path: '/word-counter', name: 'Word Counter', description: 'Count words, characters, and lines', icon: '📝' },
  { path: '/text-case-converter', name: 'Text Case Converter', description: 'Convert text between different cases', icon: 'Aa' },
  { path: '/lorem-ipsum-generator', name: 'Lorem Ipsum Generator', description: 'Generate placeholder text', icon: '📄' },
  { path: '/random-number-generator', name: 'Random Number Generator', description: 'Generate random numbers in a range', icon: '🎲' },
  { path: '/color-palette-generator', name: 'Color Palette Generator', description: 'Generate random color palettes', icon: '🎨' },
  { path: '/css-gradient-generator', name: 'CSS Gradient Generator', description: 'Create CSS gradient backgrounds', icon: '🌈' },
  { path: '/json-formatter', name: 'JSON Formatter', description: 'Format and validate JSON', icon: '{}' },
  { path: '/base64-encoder', name: 'Base64 Encoder', description: 'Encode and decode Base64', icon: '🔤' },
  { path: '/image-resizer', name: 'Image Resizer', description: 'Resize images to specific dimensions', icon: '📐' },
  { path: '/image-to-png', name: 'Image to PNG', description: 'Convert images to PNG format', icon: '🖼️' },
  { path: '/image-to-jpg', name: 'Image to JPG', description: 'Convert images to JPG format', icon: '📷' },
  { path: '/image-compressor', name: 'Image Compressor', description: 'Compress images to reduce file size', icon: '📉' },
  { path: '/uuid-generator', name: 'UUID Generator', description: 'Generate unique identifiers', icon: '🆔' },
]

const ToolCard = ({ tool }) => (
  <Link
    to={tool.path}
    className="block p-6 bg-gray-50 border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-sm transition"
  >
    <div className="text-2xl mb-3">{tool.icon}</div>
    <h2 className="text-lg font-semibold text-gray-900 mb-1">{tool.name}</h2>
    <p className="text-gray-500 text-sm">{tool.description}</p>
  </Link>
)

const ToolSection = ({ title, tools, search }) => {
  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(search.toLowerCase()) ||
    tool.description.toLowerCase().includes(search.toLowerCase())
  )

  if (filteredTools.length === 0) return null

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.path} tool={tool} />
        ))}
      </div>
    </div>
  )
}

function Home({ search = '' }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to ToolsHub</h1>
      <p className="text-gray-500 mb-8">Your go-to toolkit for everyday tasks.</p>

      <ToolSection title="PDF Tools" tools={pdfTools} search={search} />
      <ToolSection title="Word / Docs Tools" tools={wordTools} search={search} />
      <ToolSection title="Other Tools" tools={otherTools} search={search} />

      {!search && pdfTools.length === 0 && wordTools.length === 0 && otherTools.length === 0 && (
        <p className="text-gray-500">No tools found</p>
      )}
    </div>
  )
}

export default Home
