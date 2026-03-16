import { useState } from 'react'

function PDFToWord() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const extractToWord = async () => {
    if (!file) return
    setLoading(true)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const textDecoder = new TextDecoder('utf-8')
      let pdfContent = ''
      
      try {
        pdfContent = textDecoder.decode(arrayBuffer)
      } catch (e) {
        const uint8Array = new Uint8Array(arrayBuffer)
        pdfContent = ''
        for (let i = 0; i < uint8Array.length; i++) {
          pdfContent += String.fromCharCode(uint8Array[i])
        }
      }
      
      let extractedText = ''
      
      const streamMatch = pdfContent.match(/\(([^)]+)\)/g)
      if (streamMatch) {
        extractedText = streamMatch
          .map(t => t.replace(/[()\\]/g, ''))
          .filter(t => {
            const clean = t.replace(/\\x[0-9a-fA-F]{2}/g, '').trim()
            return clean.length > 1 && /[a-zA-Z]/.test(clean)
          })
          .join('\n')
      }
      
      const blob = new Blob([extractedText || 'Text could not be extracted from this PDF. It may be a scanned document.'], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = 'extracted.txt'
      link.click()
    } catch (error) {
      console.error('Error extracting:', error)
    }

    setLoading(false)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          📃
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">PDF to Word</h1>
          <p className="text-gray-500">Extract text from PDF</p>
        </div>
      </div>

      <div className="max-w-xl space-y-4">
        <div className="p-4 bg-blue-50 rounded-xl text-sm text-blue-800">
          Extract text content from PDF. Note: Scanned PDFs require OCR for text extraction.
        </div>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFile}
          className="block w-full p-4 border border-gray-300 rounded-xl"
        />

        {file && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">{file.name}</div>
            <div className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
          </div>
        )}

        <button 
          onClick={extractToWord}
          disabled={!file || loading}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? 'Extracting...' : 'Extract Text'}
        </button>
      </div>
    </div>
  )
}

export default PDFToWord
