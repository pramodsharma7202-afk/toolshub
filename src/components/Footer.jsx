import { Link } from 'react-router-dom'

const categories = [
  {
    name: 'Developer Tools',
    tools: ['JSON Formatter', 'Base64 Encoder', 'UUID Generator', 'Lorem Ipsum']
  },
  {
    name: 'Image Tools',
    tools: ['Image Resizer', 'Image to PNG', 'Image to JPG', 'Image Compressor']
  },
  {
    name: 'Text Tools',
    tools: ['Word Counter', 'Text Case Converter', 'QR Generator', 'Password Generator']
  }
]

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">ToolsHub</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
              A collection of free online tools for developers and creators. 
              Fast, simple, and no installation required.
            </p>
          </div>

          {categories.map((category) => (
            <div key={category.name}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                {category.name}
              </h3>
              <ul className="space-y-2">
                {category.tools.map((tool) => (
                  <li key={tool}>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{tool}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} ToolsHub. All rights reserved. Made with ❤️ for developers.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
