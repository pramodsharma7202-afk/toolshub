import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'

function PDFPassword() {
  const [file, setFile] = useState(null)
  const [mode, setMode] = useState('protect')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const processPDF = async () => {
    if (!file || !password) return
    setLoading(true)

    try {
      const pdfDoc = await PDFDocument.load(await file.arrayBuffer())
      
      if (mode === 'protect') {
        pdfDoc.encrypt({
          userPassword: password,
          ownerPassword: password,
          permissions: {
            printing: 'highResolution',
            modifying: false,
            copying: false,
            annotating: false,
          },
        })
      }
      
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = mode === 'protect' ? 'protected.pdf' : 'unlocked.pdf'
      link.click()
    } catch (error) {
      console.error('Error processing PDF:', error)
    }

    setLoading(false)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          🔒
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">PDF Password</h1>
          <p className="text-gray-500">Add or remove password protection</p>
        </div>
      </div>

      <div className="max-w-xl space-y-4">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMode('protect')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${
              mode === 'protect' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            Protect
          </button>
          <button
            onClick={() => setMode('unprotect')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${
              mode === 'unprotect' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            Unlock
          </button>
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
          </div>
        )}

        <div>
          <label className="block text-sm text-gray-600 mb-2">
            {mode === 'protect' ? 'Set Password' : 'Enter Password'}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password..."
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          onClick={processPDF}
          disabled={!file || !password || loading}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? 'Processing...' : mode === 'protect' ? 'Add Password' : 'Remove Password'}
        </button>
      </div>
    </div>
  )
}

export default PDFPassword
