import { useState } from 'react'
import { PDFDocument, rgb, degrees } from 'pdf-lib'

function PDFWatermark() {
  const [file, setFile] = useState(null)
  const [text, setText] = useState('Watermark')
  const [loading, setLoading] = useState(false)

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const addWatermark = async () => {
    if (!file || !text) return
    setLoading(true)

    try {
      const pdfDoc = await PDFDocument.load(await file.arrayBuffer())
      const pages = pdfDoc.getPages()
      
      pages.forEach(page => {
        const { width, height } = page.getSize()
        page.drawText(text, {
          x: width / 2 - (text.length * 20) / 2,
          y: height / 2,
          size: 50,
          color: rgb(0.5, 0.5, 0.5),
          opacity: 0.3,
          rotate: degrees(45),
        })
      })
      
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = 'watermarked.pdf'
      link.click()
    } catch (error) {
      console.error('Error adding watermark:', error)
    }

    setLoading(false)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          💧
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">PDF Watermark</h1>
          <p className="text-gray-500">Add text watermark to PDF</p>
        </div>
      </div>

      <div className="max-w-xl space-y-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFile}
          className="block w-full p-4 border border-gray-300 rounded-xl"
        />

        <div>
          <label className="block text-sm text-gray-600 mb-2">Watermark Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter watermark text..."
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          onClick={addWatermark}
          disabled={!file || !text || loading}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? 'Adding Watermark...' : 'Add Watermark'}
        </button>
      </div>
    </div>
  )
}

export default PDFWatermark
