import { useState } from 'react'

function TextCaseConverter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = (type) => {
    if (!input) return
    let result = ''
    switch (type) {
      case 'upper':
        result = input.toUpperCase()
        break
      case 'lower':
        result = input.toLowerCase()
        break
      case 'title':
        result = input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
        break
      case 'sentence':
        result = input.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
        break
      case 'toggle':
        result = input.split('').map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())).join('')
        break
      case 'capitalize':
        result = input.replace(/\b\w/g, (c) => c.toUpperCase())
        break
      default:
        result = input
    }
    setOutput(result)
  }

  const copyToClipboard = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const swapText = () => {
    setInput(output)
    setOutput('')
  }

  const cases = [
    { type: 'upper', label: 'UPPERCASE', desc: 'Convert to capital letters' },
    { type: 'lower', label: 'lowercase', desc: 'Convert to small letters' },
    { type: 'title', label: 'Title Case', desc: 'Capitalize each word' },
    { type: 'sentence', label: 'Sentence case', desc: 'Capitalize first letter' },
    { type: 'toggle', label: 'tOGGLE cASE', desc: 'Invert case of letters' },
    { type: 'capitalize', label: 'Capitalize', desc: 'Capitalize first letter' },
  ]

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          Aa
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Text Case Converter</h1>
          <p className="text-gray-500">Convert text between different cases</p>
        </div>
      </div>

      <div className="max-w-2xl space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">Input Text</label>
              <button onClick={() => { setInput(''); setOutput('') }} className="text-xs text-gray-500 hover:text-gray-700">Clear</button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text..."
              className="w-full h-40 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">Output</label>
              <div className="flex gap-2">
                {output && (
                  <button onClick={swapText} className="text-xs text-blue-600 hover:text-blue-700">Swap ↕</button>
                )}
                <button onClick={copyToClipboard} disabled={!output} className="text-xs text-blue-600 hover:text-blue-700 disabled:text-gray-400">
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Converted text will appear here..."
              className="w-full h-40 p-4 border border-gray-300 rounded-xl bg-gray-50 resize-none"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-3 block">Select Conversion</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {cases.map((c) => (
              <button
                key={c.type}
                onClick={() => convert(c.type)}
                disabled={!input}
                className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-left disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <div className="font-medium text-gray-900 text-sm">{c.label}</div>
                <div className="text-xs text-gray-500">{c.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextCaseConverter
