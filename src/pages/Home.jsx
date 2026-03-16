import { Link } from 'react-router-dom'

const tools = [
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

function Home({ search = '' }) {
  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(search.toLowerCase()) ||
    tool.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to ToolsHub</h1>
      <p className="text-gray-500 mb-8">Your go-to toolkit for everyday tasks.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="block p-6 bg-gray-50 border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-sm transition"
            >
              <div className="text-2xl mb-3">{tool.icon}</div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">{tool.name}</h2>
              <p className="text-gray-500 text-sm">{tool.description}</p>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No tools found matching "{search}"</p>
        )}
      </div>
    </div>
  )
}

export default Home
