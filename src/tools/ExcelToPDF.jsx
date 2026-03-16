import { useState } from 'react'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

function ExcelToPDF() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const convertToPDF = async () => {
    if (!file) return
    setLoading(true)

    try {
      const text = await file.text()
      
      const pdfDoc = await PDFDocument.create()
      const page = pdfDoc.addPage([595.28, 841.89])
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      
      const fontSize = 10
      const maxWidth = 555
      const { width, height } = page.getSize()
      
      const rows = text.split('\n')
      let y = height - 40
      
      for (const row of rows) {
        if (y < 40) break
        
        const cells = row.split('\t')
        let x = 20
        
        for (const cell of cells) {
          const cellText = cell.trim()
          const textWidth = font.widthOfTextAtSize(cellText, fontSize)
          
          if (x + textWidth > width - 20) break
          
          page.drawText(cellText, {
            x,
            y,
            size: fontSize,
            font,
            color: rgb(0, 0, 0),
          })
          
          x += 80
        }
        
        y -= fontSize + 3
      }
      
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = 'excel-converted.pdf'
      link.click()
    } catch (error) {
      console.error('Error converting:', error)
    }

    setLoading(false)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          📊
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Excel to PDF</h1>
          <p className="text-gray-500">Convert spreadsheets to PDF</p>
        </div>
      </div>

      <div className="max-w-xl space-y-4">
        <div className="p-4 bg-yellow-50 rounded-xl text-sm text-yellow-800">
          Note: Upload .csv or .txt files (tab-separated). Each row becomes a line in the PDF.
        </div>

        <input
          type="file"
          accept=".csv,.txt,.tsv"
          onChange={handleFile}
          className="block w-full p-4 border border-gray-300 rounded-xl"
        />

        {file && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">{file.name}</div>
            <div className="text-xs text-gray-400">{(file.size / 1024).toFixed(2)} KB</div>
          </div>
        )}

        <button 
          onClick={convertToPDF}
          disabled={!file || loading}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? 'Converting...' : 'Convert to PDF'}
        </button>
      </div>
    </div>
  )
}

export default ExcelToPDF
