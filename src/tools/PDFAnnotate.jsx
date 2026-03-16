import { useState, useRef } from 'react'
import { PDFDocument, rgb } from 'pdf-lib'

function PDFAnnotate() {
  const [file, setFile] = useState(null)
  const [tool, setTool] = useState('highlight')
  const [color, setColor] = useState('#FFFF00')
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const [position, setPosition] = useState({ x: 50, y: 50 })

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const colors = [
    { name: 'Yellow', value: '#FFFF00' },
    { name: 'Green', value: '#00FF00' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Pink', value: '#FF69B4' },
    { name: 'Red', value: '#FF0000' },
  ]

  const addAnnotation = async () => {
    if (!file || !text) return
    setLoading(true)

    try {
      const pdfDoc = await PDFDocument.load(await file.arrayBuffer())
      const pages = pdfDoc.getPages()
      const page = pages[0]
      const { width, height } = page.getSize()
      
      const colorRgb = hexToRgb(color)
      
      if (tool === 'text') {
        page.drawText(text, {
          x: position.x,
          y: height - position.y,
          size: 14,
          color: rgb(colorRgb.r, colorRgb.g, colorRgb.b),
        })
      } else if (tool === 'highlight') {
        const textWidth = text.length * 7
        page.drawRectangle({
          x: position.x,
          y: height - position.y - 4,
          width: textWidth,
          height: 18,
          color: rgb(colorRgb.r, colorRgb.g, colorRgb.b),
          opacity: 0.5,
        })
        page.drawText(text, {
          x: position.x,
          y: height - position.y,
          size: 12,
          color: rgb(0, 0, 0),
        })
      }
      
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = 'annotated.pdf'
      link.click()
    } catch (error) {
      console.error('Error annotating:', error)
    }

    setLoading(false)
  }

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : { r: 0, g: 0, b: 0 }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          🖍️
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Annotate PDF</h1>
          <p className="text-gray-500">Add text or highlights to PDF</p>
        </div>
      </div>

      <div className="max-w-xl space-y-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFile}
          className="block w-full p-4 border border-gray-300 rounded-xl"
        />

        {file && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => setTool('highlight')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                  tool === 'highlight' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}
              >
                Highlight
              </button>
              <button
                onClick={() => setTool('text')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                  tool === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}
              >
                Text
              </button>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Color</label>
              <div className="flex gap-2">
                {colors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setColor(c.value)}
                    className={`w-8 h-8 rounded-full border-2 ${color === c.value ? 'border-gray-900' : 'border-transparent'}`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Text</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter annotation text..."
                className="w-full p-3 border border-gray-300 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">X Position</label>
                <input
                  type="number"
                  value={position.x}
                  onChange={(e) => setPosition({ ...position, x: parseInt(e.target.value) })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Y Position</label>
                <input
                  type="number"
                  value={position.y}
                  onChange={(e) => setPosition({ ...position, y: parseInt(e.target.value) })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={addAnnotation}
          disabled={!file || !text || loading}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? 'Adding...' : 'Add Annotation'}
        </button>
      </div>
    </div>
  )
}

export default PDFAnnotate
