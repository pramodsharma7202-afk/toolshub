import { useState, useRef } from 'react'
import { PDFDocument, rgb } from 'pdf-lib'

function PDFGenerator() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const linkRef = useRef()

  const generatePDF = async () => {
    if (!text.trim()) return
    setLoading(true)
    
    try {
      const pdfDoc = await PDFDocument.create()
      const page = pdfDoc.addPage([595.28, 841.89]) // A4 size
      const { width, height } = page.getSize()
      
      const fontSize = 14
      const lines = text.split('\n')
      let y = height - 50
      
      for (const line of lines) {
        if (y < 50) break
        page.drawText(line, {
          x: 50,
          y,
          size: fontSize,
          color: rgb(0, 0, 0),
        })
        y -= fontSize + 5
      }
      
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      linkRef.current.href = url
      linkRef.current.download = 'generated.pdf'
      linkRef.current.click()
      
      setGenerated(true)
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
    
    setLoading(false)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          📄
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">PDF Generator</h1>
          <p className="text-gray-500">Create PDFs from text</p>
        </div>
      </div>

      <div className="max-w-xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Enter Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
            className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <button 
          onClick={generatePDF}
          disabled={!text.trim() || loading}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? 'Generating PDF...' : 'Generate PDF'}
        </button>

        <a ref={linkRef} className="hidden" />
      </div>
    </div>
  )
}

export default PDFGenerator
