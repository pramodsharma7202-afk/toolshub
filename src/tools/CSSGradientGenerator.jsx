import { useState } from 'react'

function CSSGradientGenerator() {
  const [color1, setColor1] = useState('#6366f1')
  const [color2, setColor2] = useState('#ec4899')
  const [direction, setDirection] = useState('135deg')
  const [copied, setCopied] = useState(false)

  const gradient = `linear-gradient(${direction}, ${color1}, ${color2})`
  const cssCode = `background: ${gradient};`

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(cssCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          🌈
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CSS Gradient Generator</h1>
          <p className="text-gray-500">Create CSS gradient backgrounds</p>
        </div>
      </div>

      <div className="max-w-xl space-y-6">
        <div
          className="h-48 rounded-2xl border-2 border-gray-200 shadow-inner"
          style={{ background: gradient }}
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Color 1</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg font-mono text-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Color 2</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg font-mono text-sm"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-600">Direction</label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="0deg">Top to Bottom (0°)</option>
            <option value="45deg">Top Right (45°)</option>
            <option value="90deg">Right to Left (90°)</option>
            <option value="135deg">Bottom Right (135°)</option>
            <option value="180deg">Bottom to Top (180°)</option>
            <option value="225deg">Bottom Left (225°)</option>
            <option value="270deg">Left to Right (270°)</option>
            <option value="315deg">Top Left (315°)</option>
          </select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">CSS Code</label>
            <button
              onClick={copyToClipboard}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
          <code className="block p-4 bg-gray-900 rounded-xl text-green-400 font-mono text-sm">
            {cssCode}
          </code>
        </div>
      </div>
    </div>
  )
}

export default CSSGradientGenerator
