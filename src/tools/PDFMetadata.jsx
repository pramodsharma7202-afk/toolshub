import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'

function PDFMetadata() {
  const [file, setFile] = useState(null)
  const [metadata, setMetadata] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [subject, setSubject] = useState('')
  const [keywords, setKeywords] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFile = async (e) => {
    const f = e.target.files[0]
    if (f) {
      setFile(f)
      const arrayBuffer = await f.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      
      setMetadata({
        title: pdfDoc.getTitle() || '',
        author: pdfDoc.getAuthor() || '',
        subject: pdfDoc.getSubject() || '',
        keywords: pdfDoc.getKeywords() || '',
        pageCount: pdfDoc.getPageCount(),
        creationDate: pdfDoc.getCreationDate(),
        modificationDate: pdfDoc.getModificationDate(),
      })
      
      setTitle(pdfDoc.getTitle() || '')
      setAuthor(pdfDoc.getAuthor() || '')
      setSubject(pdfDoc.getSubject() || '')
      setKeywords(pdfDoc.getKeywords() || '')
    }
  }

  const saveMetadata = async () => {
    if (!file) return
    setLoading(true)

    try {
      const pdfDoc = await PDFDocument.load(await file.arrayBuffer())
      pdfDoc.setTitle(title)
      pdfDoc.setAuthor(author)
      pdfDoc.setSubject(subject)
      pdfDoc.setKeywords(keywords.split(',').map(k => k.trim()))
      
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = 'with-metadata.pdf'
      link.click()
    } catch (error) {
      console.error('Error saving metadata:', error)
    }

    setLoading(false)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          ℹ️
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">PDF Metadata</h1>
          <p className="text-gray-500">View and edit PDF metadata</p>
        </div>
      </div>

      <div className="max-w-xl space-y-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFile}
          className="block w-full p-4 border border-gray-300 rounded-xl"
        />

        {metadata && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-500">Pages:</span> {metadata.pageCount}</div>
              <div><span className="text-gray-500">Created:</span> {metadata.creationDate?.toDateString()}</div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Keywords (comma separated)</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        )}

        <button 
          onClick={saveMetadata}
          disabled={!file || loading}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? 'Saving...' : 'Save with Metadata'}
        </button>
      </div>
    </div>
  )
}

export default PDFMetadata
