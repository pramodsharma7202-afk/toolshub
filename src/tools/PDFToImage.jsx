import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { jsPDF } from 'jspdf'

function PDFToImage() {
  const [file, setFile] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleFile = async (e) => {
    const f = e.target.files[0]
    if (f) {
      setFile(f)
      const arrayBuffer = await f.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      setTotalPages(pdf.getPageCount())
      setPage(1)
    }
  }

  const convertToImage = async () => {
    if (!file) return
    setLoading(true)

    try {
      const pdfDoc = await PDFDocument.load(await file.arrayBuffer())
      const pdfPage = await pdfDoc.getPage(page - 1)
      
      const { width, height } = pdfPage.getSize()
      
      const scale = 2
      const canvas = document.createElement('canvas')
      canvas.width = width * scale
      canvas.height = height * scale
      const ctx = canvas.getContext('2d')
      
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.scale(scale, scale)
      
      const pdfjsLib = window.pdfjsLib
      if (pdfjsLib) {
        const loadingTask = pdfjsLib.getDocument(await file.arrayBuffer())
        const pdf = await loadingTask.promise
        const pageObj = await pdf.getPage(page)
        
        const viewport = pageObj.getViewport({ scale: 2 })
        canvas.width = viewport.width
        canvas.height = viewport.height
        
        await pageObj.render({
          canvasContext: ctx,
          viewport: viewport
        }).promise
      }
      
      const dataUrl = canvas.toDataURL('image/png')
      
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `page-${page}.png`
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
          🖼️
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">PDF to Image</h1>
          <p className="text-gray-500">Convert PDF pages to images</p>
        </div>
      </div>

      <div className="max-w-xl space-y-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFile}
          className="block w-full p-4 border border-gray-300 rounded-xl"
        />

        {totalPages > 0 && (
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">{file.name}</div>
              <div className="text-xs text-gray-400">{totalPages} pages</div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Select Page</label>
              <div className="flex gap-2 items-center">
                <button 
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-3 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
                >
                  ◀
                </button>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={page}
                  onChange={(e) => setPage(Math.min(totalPages, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-20 p-2 border border-gray-300 rounded-lg text-center"
                />
                <span className="text-gray-500">of {totalPages}</span>
                <button 
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
                >
                  ▶
                </button>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={convertToImage}
          disabled={!file || loading}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? 'Converting...' : 'Convert to PNG'}
        </button>
      </div>
    </div>
  )
}

export default PDFToImage
