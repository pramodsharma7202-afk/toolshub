import { useState } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

function PDFPageNumbers() {
  const [file, setFile] = useState(null)
  const [position, setPosition] = useState('bottom-center')
  const [loading, setLoading] = useState(false)

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const addPageNumbers = async () => {
    if (!file) return
    setLoading(true)

    try {
      const pdfDoc = await PDFDocument.load(await file.arrayBuffer())
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const pages = pdfDoc.getPages()
      
      pages.forEach((page, index) => {
        const { width, height } = page.getSize()
        const pageNum = (index + 1).toString()
        const fontSize = 12
        
        let x, y
        if (position === 'bottom-center') {
          x = width / 2 - font.widthOfTextAtSize(pageNum, fontSize) / 2
          y = 20
        } else if (position === 'bottom-right') {
          x = width - 50
          y = 20
        } else if (position === 'top-center') {
          x = width / 2 - font.widthOfTextAtSize(pageNum, fontSize) / 2
          y = height - 30
        } else {
          x = 30
          y = height - 30
        }
        
        page.drawText(pageNum, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        })
      })
      
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = 'with-page-numbers.pdf'
      link.click()
    } catch (error) {
      console.error('Error adding page numbers:', error)
    }

    setLoading(false)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          #
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">PDF Page Numbers</h1>
          <p className="text-gray-500">Add page numbers to PDF</p>
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
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">{file.name}</div>
          </div>
        )}

        <div>
          <label className="block text-sm text-gray-600 mb-2">Position</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'bottom-center', label: 'Bottom Center' },
              { value: 'bottom-right', label: 'Bottom Right' },
              { value: 'top-center', label: 'Top Center' },
              { value: 'top-left', label: 'Top Left' },
            ].map((pos) => (
              <button
                key={pos.value}
                onClick={() => setPosition(pos.value)}
                className={`py-2 rounded-lg text-sm font-medium ${
                  position === pos.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {pos.label}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={addPageNumbers}
          disabled={!file || loading}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? 'Adding...' : 'Add Page Numbers'}
        </button>
      </div>
    </div>
  )
}

export default PDFPageNumbers
