import { useState } from 'react'

function WordFormatter() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [options, setOptions] = useState({
    removeExtraSpaces: true,
    removeLineBreaks: false,
    trimWhitespace: true,
  })

  const format = () => {
    let formatted = text
    
    if (options.removeExtraSpaces) {
      formatted = formatted.replace(/[ \t]+/g, ' ')
    }
    
    if (options.removeLineBreaks) {
      formatted = formatted.replace(/\n\s*\n/g, '\n')
    }
    
    if (options.trimWhitespace) {
      formatted = formatted.split('\n').map(line => line.trim()).join('\n')
    }
    
    setResult(formatted)
  }

  const copyText = () => {
    navigator.clipboard.writeText(result)
  }

  const downloadText = () => {
    const blob = new Blob([result], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'formatted.txt'
    link.click()
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          🧹
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Word Formatter</h1>
          <p className="text-gray-500">Clean and format text</p>
        </div>
      </div>

      <div className="max-w-xl space-y-4">
        <div className="flex flex-wrap gap-2">
          {Object.entries(options).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            </label>
          ))}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here..."
          className="w-full h-48 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <button 
          onClick={format}
          disabled={!text}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Format Text
        </button>

        {result && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-600">Formatted Text</label>
              <div className="flex gap-2">
                <button onClick={copyText} className="text-sm text-blue-500 hover:text-blue-700">Copy</button>
                <button onClick={downloadText} className="text-sm text-blue-500 hover:text-blue-700">Download</button>
              </div>
            </div>
            <textarea
              value={result}
              readOnly
              className="w-full h-48 p-4 border border-gray-300 rounded-xl bg-gray-50 resize-none"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default WordFormatter
