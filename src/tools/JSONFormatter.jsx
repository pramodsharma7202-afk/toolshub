import { useState } from 'react'

function JSONFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const format = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (e) {
      setError('Invalid JSON: ' + e.message)
      setOutput('')
    }
  }

  const minify = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (e) {
      setError('Invalid JSON: ' + e.message)
      setOutput('')
    }
  }

  const copyToClipboard = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          {'{}'}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">JSON Formatter</h1>
          <p className="text-gray-500">Format and validate JSON</p>
        </div>
      </div>

      <div className="max-w-2xl space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"key": "value"}'
          className="w-full h-40 p-4 border border-gray-300 rounded-xl font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-2">
          <button
            onClick={format}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
          >
            Format
          </button>
          <button
            onClick={minify}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300"
          >
            Minify
          </button>
          {output && (
            <button
              onClick={copyToClipboard}
              className="px-4 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        {output && (
          <textarea
            value={output}
            readOnly
            className="w-full h-60 p-4 border border-gray-300 rounded-xl bg-gray-50 font-mono text-sm resize-none"
          />
        )}
      </div>
    </div>
  )
}

export default JSONFormatter
