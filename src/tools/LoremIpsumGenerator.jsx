import { useState } from 'react'

function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3)
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat']
    
    const generateParagraph = (sentenceCount) => {
      return Array.from({ length: sentenceCount }, () => {
        const wordCount = Math.floor(Math.random() * 10) + 5
        return Array.from({ length: wordCount }, () => words[Math.floor(Math.random() * words.length)]).join(' ')
      }).join('. ') + '.'
    }

    const result = Array.from({ length: paragraphs }, () => generateParagraph(Math.floor(Math.random() * 5) + 3)).join('\n\n')
    setText(result)
  }

  const copyToClipboard = async () => {
    if (!text) return
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          📄
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lorem Ipsum Generator</h1>
          <p className="text-gray-500">Generate placeholder text</p>
        </div>
      </div>

      <div className="max-w-2xl space-y-4">
        <div className="flex items-center gap-4">
          <label className="text-gray-700">Number of Paragraphs:</label>
          <input
            type="number"
            min="1"
            max="20"
            value={paragraphs}
            onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)}
            className="w-20 p-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={generate}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
          >
            Generate
          </button>
          {text && (
            <button
              onClick={copyToClipboard}
              className="px-4 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
        <textarea
          value={text}
          readOnly
          placeholder="Click generate to create lorem ipsum text..."
          className="w-full h-80 p-4 border border-gray-300 rounded-xl bg-gray-50 resize-none"
        />
      </div>
    </div>
  )
}

export default LoremIpsumGenerator
