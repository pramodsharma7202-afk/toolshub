import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const tools = [
  { path: '/qr-generator', name: 'QR Generator', icon: '⬜' },
  { path: '/password-generator', name: 'Password Generator', icon: '🔐' },
  { path: '/word-counter', name: 'Word Counter', icon: '📝' },
  { path: '/text-case-converter', name: 'Text Case Converter', icon: 'Aa' },
  { path: '/lorem-ipsum-generator', name: 'Lorem Ipsum Generator', icon: '📄' },
  { path: '/random-number-generator', name: 'Random Number Generator', icon: '🎲' },
  { path: '/color-palette-generator', name: 'Color Palette Generator', icon: '🎨' },
  { path: '/css-gradient-generator', name: 'CSS Gradient Generator', icon: '🌈' },
  { path: '/json-formatter', name: 'JSON Formatter', icon: '{}' },
  { path: '/base64-encoder', name: 'Base64 Encoder', icon: '🔤' },
  { path: '/image-resizer', name: 'Image Resizer', icon: '📐' },
  { path: '/image-to-png', name: 'Image to PNG', icon: '🖼️' },
  { path: '/image-to-jpg', name: 'Image to JPG', icon: '📷' },
  { path: '/image-compressor', name: 'Image Compressor', icon: '📉' },
  { path: '/uuid-generator', name: 'UUID Generator', icon: '🆔' },
]

function Layout({ children }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-[#16171d] text-white p-4 fixed h-full overflow-y-auto">
        <div className="mb-8 pt-2">
          <h1 className="text-xl font-bold">ToolsHub</h1>
        </div>
        <ul className="space-y-1">
          {tools.map((tool) => (
            <li key={tool.path}>
              <Link
                to={tool.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  location.pathname === tool.path
                    ? 'bg-[#2a2b33] text-white'
                    : 'text-gray-400 hover:bg-[#2a2b33] hover:text-white'
                }`}
              >
                <span className="text-lg">{tool.icon}</span>
                <span className="text-sm">{tool.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <main className="ml-64 flex-1 bg-white">
        <div className="max-w-4xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout
