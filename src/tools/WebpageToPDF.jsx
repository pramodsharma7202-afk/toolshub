import { useState } from 'react'
import { jsPDF } from 'jspdf'

function WebpageToPDF() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const convertToPDF = async () => {
    if (!url) return
    setLoading(true)
    setError('')

    try {
      const response = await fetch(url)
      const html = await response.text()
      
      const doc = new jsPDF()
      const element = document.createElement('div')
      element.innerHTML = html
      
      const text = element.innerText || element.textContent || ''
      const lines = doc.splitTextToSize(text, 180)
      
      let y = 10
      for (const line of lines) {
        if (y > 280) {
          doc.addPage()
          y = 10
        }
        doc.text(line, 10, y)
        y += 7
      }
      
      doc.save('webpage.pdf')
    } catch (err) {
      setError('Could not fetch the webpage. It may be blocked by CORS.')
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
          <h1 className="text-2xl font-bold text-gray-900">Webpage to PDF</h1>
          <p className="text-gray-500">Convert a URL to PDF</p>
        </div>
      </div>

      <div className="max-w-xl space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-2">Enter URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>
        )}

        <button 
          onClick={convertToPDF}
          disabled={!url || loading}
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

        <p className="text-xs text-gray-400">
          Note: Some websites may not work due to CORS restrictions.
        </p>
      </div>
    </div>
  )
}

export default WebpageToPDF
