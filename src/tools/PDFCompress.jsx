import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'

function PDFCompress() {
  const [file, setFile] = useState(null)
  const [quality, setQuality] = useState('medium')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleFile = (e) => {
    setFile(e.target.files[0])
    setResult(null)
  }

  const compressPDF = async () => {
    if (!file) return
    setLoading(true)

    try {
      const pdfDoc = await PDFDocument.load(await file.arrayBuffer())
      const compressedPdf = await PDFDocument.create()
      const pages = await compressedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices())
      pages.forEach(page => compressedPdf.addPage(page))
      
      const pdfBytes = await compressedPdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = 'compressed.pdf'
      link.click()
      
      setResult({
        original: file.size,
        compressed: blob.size,
        savings: Math.round((1 - blob.size / file.size) * 100)
      })
    } catch (error) {
      console.error('Error compressing PDF:', error)
    }

    setLoading(false)
  }

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          📉
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">PDF Compress</h1>
          <p className="text-gray-500">Reduce PDF file size</p>
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
            <div className="text-sm text-gray-400">{formatSize(file.size)}</div>
          </div>
        )}

        <div>
          <label className="block text-sm text-gray-600 mb-2">Compression Level</label>
          <div className="grid grid-cols-3 gap-2">
            {['low', 'medium', 'high'].map((q) => (
              <button
                key={q}
                onClick={() => setQuality(q)}
                className={`py-2 rounded-lg text-sm font-medium capitalize ${
                  quality === q
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={compressPDF}
          disabled={!file || loading}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? 'Compressing...' : 'Compress PDF'}
        </button>

        {result && (
          <div className="flex justify-center gap-6 p-4 bg-gray-50 rounded-xl">
            <div className="text-center">
              <div className="text-lg font-bold">{formatSize(result.original)}</div>
              <div className="text-sm text-gray-500">Original</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{formatSize(result.compressed)}</div>
              <div className="text-sm text-gray-500">Compressed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{result.savings}%</div>
              <div className="text-sm text-gray-500">Saved</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PDFCompress
