import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'

function PDFSplit() {
  const [file, setFile] = useState(null)
  const [pages, setPages] = useState([])
  const [allPages, setAllPages] = useState([])
  const [loading, setLoading] = useState(false)

  const handleFile = async (e) => {
    const f = e.target.files[0]
    if (f) {
      setFile(f)
      const arrayBuffer = await f.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      setAllPages(Array.from({ length: pdf.getPageCount() }, (_, i) => i + 1))
      setPages([])
    }
  }

  const togglePage = (pageNum) => {
    if (pages.includes(pageNum)) {
      setPages(pages.filter(p => p !== pageNum))
    } else {
      setPages([...pages, pageNum].sort((a, b) => a - b))
    }
  }

  const selectAll = () => {
    setPages([...allPages])
  }

  const deselectAll = () => {
    setPages([])
  }

  const extractPages = async () => {
    if (!file || pages.length === 0) return
    setLoading(true)

    try {
      const srcDoc = await PDFDocument.load(await file.arrayBuffer())
      const newDoc = await PDFDocument.create()
      
      const pageIndices = pages.map(p => p - 1)
      const copiedPages = await newDoc.copyPages(srcDoc, pageIndices)
      copiedPages.forEach(page => newDoc.addPage(page))
      
      const pdfBytes = await newDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = 'extracted.pdf'
      link.click()
    } catch (error) {
      console.error('Error extracting pages:', error)
    }

    setLoading(false)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          ✂️
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">PDF Split</h1>
          <p className="text-gray-500">Extract specific pages from PDF</p>
        </div>
      </div>

      <div className="max-w-xl space-y-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFile}
          className="block w-full p-4 border border-gray-300 rounded-xl"
        />

        {allPages.length > 0 && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <button onClick={selectAll} className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">Select All</button>
              <button onClick={deselectAll} className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">Deselect All</button>
              <span className="ml-auto text-sm text-gray-500">{pages.length} selected</span>
            </div>
            
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-60 overflow-y-auto p-2 bg-gray-50 rounded-xl">
              {allPages.map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => togglePage(pageNum)}
                  className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                    pages.includes(pageNum)
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={extractPages}
          disabled={pages.length === 0 || loading}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? 'Extracting...' : 'Extract Selected Pages'}
        </button>
      </div>
    </div>
  )
}

export default PDFSplit
