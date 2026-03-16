import { useState } from 'react'

function UUIDGenerator() {
  const [uuids, setUuids] = useState([])
  const [copiedIndex, setCopiedIndex] = useState(null)

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  const generate = (count = 1) => {
    const newUuids = Array.from({ length: count }, () => generateUUID())
    setUuids([...newUuids, ...uuids])
  }

  const copyToClipboard = async (uuid, index) => {
    await navigator.clipboard.writeText(uuid)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const copyAll = async () => {
    await navigator.clipboard.writeText(uuids.join('\n'))
    setCopiedIndex('all')
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const clearAll = () => {
    setUuids([])
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          🆔
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">UUID Generator</h1>
          <p className="text-gray-500">Generate unique identifiers</p>
        </div>
      </div>

      <div className="max-w-2xl space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => generate(1)}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
          >
            Generate 1
          </button>
          <button
            onClick={() => generate(5)}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
          >
            Generate 5
          </button>
          <button
            onClick={() => generate(10)}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
          >
            Generate 10
          </button>
          {uuids.length > 0 && (
            <>
              <button
                onClick={copyAll}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300"
              >
                {copiedIndex === 'all' ? 'Copied All!' : 'Copy All'}
              </button>
              <button
                onClick={clearAll}
                className="px-4 py-2 bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200"
              >
                Clear All
              </button>
            </>
          )}
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {uuids.map((uuid, i) => (
            <div
              key={i}
              onClick={() => copyToClipboard(uuid, i)}
              className="p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm cursor-pointer hover:bg-gray-100 hover:border-blue-300 transition flex justify-between items-center group"
            >
              <span className="text-gray-800">{uuid}</span>
              <span className="text-sm text-blue-600 opacity-0 group-hover:opacity-100 transition">
                {copiedIndex === i ? 'Copied!' : 'Click to copy'}
              </span>
            </div>
          ))}
        </div>

        {uuids.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            Click a button above to generate UUIDs
          </div>
        )}
      </div>
    </div>
  )
}

export default UUIDGenerator
