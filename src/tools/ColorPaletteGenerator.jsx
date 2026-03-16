import { useState } from 'react'

function ColorPaletteGenerator() {
  const [colors, setColors] = useState([])
  const [copiedIndex, setCopiedIndex] = useState(null)

  const generatePalette = () => {
    const newColors = Array.from({ length: 5 }, () => 
      `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
    )
    setColors(newColors)
  }

  const copyToClipboard = async (color, index) => {
    await navigator.clipboard.writeText(color)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const copyAll = async () => {
    await navigator.clipboard.writeText(colors.join(', '))
    setCopiedIndex('all')
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          🎨
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Color Palette Generator</h1>
          <p className="text-gray-500">Generate random color palettes</p>
        </div>
      </div>

      <div className="max-w-2xl space-y-4">
        <button
          onClick={generatePalette}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
        >
          Generate Palette
        </button>
        
        {colors.length > 0 && (
          <>
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => copyToClipboard(color, i)}
                  className="h-28 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer relative group"
                  style={{ backgroundColor: color }}
                  title="Click to copy"
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/20 rounded-xl">
                    <span className="text-white text-sm font-medium">
                      {copiedIndex === i ? 'Copied!' : 'Copy'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {colors.map((color, i) => (
                  <span
                    key={i}
                    onClick={() => copyToClipboard(color, i)}
                    className="px-3 py-1 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 text-sm font-mono"
                  >
                    {copiedIndex === i ? 'Copied!' : color}
                  </span>
                ))}
              </div>
              <button
                onClick={copyAll}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                {copiedIndex === 'all' ? 'Copied All!' : 'Copy All'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ColorPaletteGenerator
