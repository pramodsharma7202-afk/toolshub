import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

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

function Navbar({ search, setSearch, sidebarOpen, setSidebarOpen }) {
  const { darkMode, toggleTheme } = useTheme()

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                ToolsHub
              </span>
            </Link>

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? (
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden ${sidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)} />
      
      <aside className={`fixed top-16 left-0 bottom-0 w-72 z-40 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 overflow-y-auto h-full pb-24">
          <div className="md:hidden mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tools..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">All Tools</h2>
          <ul className="space-y-1">
            {tools.map((tool) => (
              <li key={tool.path}>
                <Link
                  to={tool.path}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-lg">{tool.icon}</span>
                  <span className="text-sm font-medium">{tool.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
}

export default Navbar
