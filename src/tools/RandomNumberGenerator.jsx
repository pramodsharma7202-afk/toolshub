import { useState } from 'react'

function RandomNumberGenerator() {
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [copied, setCopied] = useState(false)

  const generate = () => {
    if (min > max) {
      alert('Min must be less than Max')
      return
    }
    const num = Math.floor(Math.random() * (max - min + 1)) + min
    setResult(num)
    setHistory(prev => [num, ...prev.slice(0, 9)])
  }

  const copyToClipboard = async () => {
    if (result === null) return
    await navigator.clipboard.writeText(result.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          🎲
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Random Number Generator</h1>
          <p className="text-gray-500">Generate random numbers in a range</p>
        </div>
      </div>

      <div className="max-w-xl space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-xl">
            <label className="block text-sm text-gray-600 mb-2">Minimum</label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(parseInt(e.target.value) || 0)}
              className="w-full p-3 bg-white border border-gray-300 rounded-lg text-center text-lg font-semibold"
            />
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <label className="block text-sm text-gray-600 mb-2">Maximum</label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(parseInt(e.target.value) || 0)}
              className="w-full p-3 bg-white border border-gray-300 rounded-lg text-center text-lg font-semibold"
            />
          </div>
          <div className="bg-gray-50 p-4 rounded-xl flex items-end">
            <button
              onClick={generate}
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
            >
              Generate
            </button>
          </div>
        </div>

        {result !== null && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Result</span>
              <button
                onClick={copyToClipboard}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="p-8 bg-gray-900 rounded-2xl text-center">
              <span className="text-5xl font-bold text-white">{result}</span>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div>
            <span className="text-sm font-medium text-gray-700 mb-2 block">Recent Results</span>
            <div className="flex flex-wrap gap-2">
              {history.map((num, i) => (
                <button
                  key={i}
                  onClick={() => { setResult(num); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-mono text-sm"
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RandomNumberGenerator
