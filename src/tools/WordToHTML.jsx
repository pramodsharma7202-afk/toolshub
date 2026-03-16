import { useState } from 'react'

function WordToHTML() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState('')

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const convertToHTML = async () => {
    if (!file) return
    setLoading(true)

    try {
      const text = await file.text()
      
      const paragraphs = text.split('\n\n').filter(p => p.trim())
      
      let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${file.name.replace(/\.(doc|docx|txt)$/, '')}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      line-height: 1.6;
    }
    h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
    p { margin: 16px 0; text-align: justify; }
  </style>
</head>
<body>
`
      
      paragraphs.forEach(para => {
        const trimmed = para.trim()
        if (trimmed.startsWith('#')) {
          html += `  <h1>${trimmed.replace(/^#+\s*/, '')}</h1>\n`
        } else {
          html += `  <p>${trimmed.replace(/\n/g, '<br>')}</p>\n`
        }
      })
      
      html += `</body>
</html>`
      
      setPreview(html)
      
      const blob = new Blob([html], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = file.name.replace(/\.(doc|docx|txt)$/, '.html')
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
          🌐
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Word to HTML</h1>
          <p className="text-gray-500">Convert Word documents to HTML</p>
        </div>
      </div>

      <div className="max-w-xl space-y-4">
        <div className="p-4 bg-blue-50 rounded-xl text-sm text-blue-800">
          Upload a .txt, .doc, or .docx file to convert it to HTML format.
        </div>

        <input
          type="file"
          accept=".txt,.doc,.docx"
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
          onClick={convertToHTML}
          disabled={!file || loading}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? 'Converting...' : 'Convert to HTML'}
        </button>

        {preview && (
          <div>
            <label className="block text-sm text-gray-600 mb-2">HTML Preview</label>
            <textarea
              value={preview}
              readOnly
              className="w-full h-48 p-3 border border-gray-300 rounded-xl bg-gray-50 text-xs font-mono resize-none"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default WordToHTML
