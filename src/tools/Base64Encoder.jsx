import { useState } from 'react'

function Base64Encoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const convert = () => {
    setError('')
    try {
      if (mode === 'encode') {
        setOutput(btoa(input))
      } else {
        setOutput(atob(input))
      }
    } catch (e) {
      setError('Error: Invalid input for decoding')
      setOutput('')
    }
  }

  const copyToClipboard = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const swap = () => {
    setInput(output)
    setOutput('')
    setError('')
    setMode(mode === 'encode' ? 'decode' : 'encode')
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          🔤
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Base64 Encoder</h1>
          <p className="text-gray-500">Encode and decode Base64</p>
        </div>
      </div>

      <div className="max-w-2xl space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => { setMode('encode'); setOutput(''); setError('') }}
            className={`px-4 py-2 rounded-lg font-medium ${mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Encode
          </button>
          <button
            onClick={() => { setMode('decode'); setOutput(''); setError('') }}
            className={`px-4 py-2 rounded-lg font-medium ${mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Decode
          </button>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
          className="w-full h-40 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-2">
          <button
            onClick={convert}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
          >
            {mode === 'encode' ? 'Encode' : 'Decode'}
          </button>
          {output && (
            <button
              onClick={swap}
              className="px-4 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300"
            >
              Swap ↕
            </button>
          )}
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
            className="w-full h-40 p-4 border border-gray-300 rounded-xl bg-gray-50 resize-none"
          />
        )}
      </div>
    </div>
  )
}

export default Base64Encoder
