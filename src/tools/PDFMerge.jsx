import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'

function PDFMerge() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [merged, setMerged] = useState(false)

  const handleFiles = (e) => {
    const newFiles = Array.from(e.target.files)
    setFiles([...files, ...newFiles])
    setMerged(false)
  }

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
  }

  const moveFile = (index, direction) => {
    const newFiles = [...files]
    if (direction === 'up' && index > 0) {
      [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]]
    } else if (direction === 'down' && index < newFiles.length - 1) {
      [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]]
    }
    setFiles(newFiles)
  }

  const mergePDFs = async () => {
    if (files.length < 2) return
    setLoading(true)

    try {
      const mergedPdf = await PDFDocument.create()
      
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach((page) => mergedPdf.addPage(page))
      }
      
      const pdfBytes = await mergedPdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = 'merged.pdf'
      link.click()
      
      setMerged(true)
    } catch (error) {
      console.error('Error merging PDFs:', error)
    }

    setLoading(false)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          🔗
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">PDF Merge</h1>
          <p className="text-gray-500">Combine multiple PDFs into one</p>
        </div>
      </div>

      <div className="max-w-xl space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFiles}
            className="hidden"
            id="pdf-upload"
          />
          <label htmlFor="pdf-upload" className="cursor-pointer">
            <div className="text-4xl mb-2">📁</div>
            <div className="text-gray-600">Click to upload PDFs</div>
            <div className="text-sm text-gray-400 mt-1">or drag and drop</div>
          </label>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm text-gray-500 mb-2">Files ({files.length}) - Drag to reorder:</div>
            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <div className="flex flex-col gap-1">
                  <button onClick={() => moveFile(index, 'up')} disabled={index === 0} className="text-gray-400 hover:text-gray-600 disabled:opacity-30">▲</button>
                  <button onClick={() => moveFile(index, 'down')} disabled={index === files.length - 1} className="text-gray-400 hover:text-gray-600 disabled:opacity-30">▼</button>
                </div>
                <div className="flex-1 text-sm text-gray-700 truncate">{file.name}</div>
                <div className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                <button onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">✕</button>
              </div>
            ))}
          </div>
        )}

        <button 
          onClick={mergePDFs}
          disabled={files.length < 2 || loading}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? 'Merging...' : 'Merge PDFs'}
        </button>
      </div>
    </div>
  )
}

export default PDFMerge
