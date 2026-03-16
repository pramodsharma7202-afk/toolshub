import { useState } from 'react'

function PDFToText() {
  const [file, setFile] = useState(null)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const extractText = async () => {
    if (!file) return
    setLoading(true)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const textDecoder = new TextDecoder('utf-8')
      const pdfContent = textDecoder.decode(arrayBuffer)
      
      const textMatch = pdfContent.match(/\((.*?)\)/g)
      let extractedText = ''
      
      if (textMatch) {
        extractedText = textMatch
          .map(t => t.replace(/[()]/g, ''))
          .filter(t => t.length > 0 && !t.includes('\\x00'))
          .join(' ')
      }
      
      setText(extractedText || 'No text could be extracted. This may be a scanned PDF.')
    } catch (error) {
      console.error('Error extracting text:', error)
      setText('Error extracting text from PDF')
    }

    setLoading(false)
  }

  const copyText = () => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          📝
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">PDF to Text</h1>
          <p className="text-gray-500">Extract text from PDF</p>
        </div>
      </div>

      <div className="max-w-xl space-y-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFile}
          className="block w-full p-4 border border-gray-300 rounded-xl"
        />

        <button 
          onClick={extractText}
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

        {text && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-600">Extracted Text</label>
              <button onClick={copyText} className="text-sm text-blue-500 hover:text-blue-700">Copy</button>
            </div>
            <textarea
              value={text}
              readOnly
              className="w-full h-64 p-4 border border-gray-300 rounded-xl bg-gray-50 resize-none"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default PDFToText
