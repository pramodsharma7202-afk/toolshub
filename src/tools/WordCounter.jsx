import { useState } from 'react'

function WordCounter() {
  const [text, setText] = useState('')

  const counts = {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    lines: text.split('\n').length,
  }

  const copyToClipboard = async (value) => {
    await navigator.clipboard.writeText(value.toString())
  }

  const stats = [
    { label: 'Words', value: counts.words, icon: '📝' },
    { label: 'Characters', value: counts.characters, icon: '🔤' },
    { label: 'No Spaces', value: counts.charactersNoSpaces, icon: '✂️' },
    { label: 'Lines', value: counts.lines, icon: '📄' },
  ]

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          📝
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Word Counter</h1>
          <p className="text-gray-500">Count words, characters, and lines</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter or paste your text here..."
          className="w-full h-64 p-4 border border-gray-300 rounded-xl mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="grid grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <button
              key={i}
              onClick={() => copyToClipboard(stat.value)}
              className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-center hover:bg-gray-100 hover:border-blue-300 transition group"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 group-hover:text-blue-600">{stat.value.toLocaleString()}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </button>
          ))}
        </div>

        {text && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setText('')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear text
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default WordCounter
