import { useState } from 'react'

function QRCodeGenerator() {
  const [text, setText] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateQR = async () => {
    if (!text.trim()) return
    setLoading(true)
    setQrCode('')
    
    setTimeout(() => {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`
      setQrCode(url)
      setLoading(false)
    }, 500)
  }

  const copyToClipboard = async () => {
    if (!qrCode) return
    try {
      const response = await fetch(qrCode)
      const blob = await response.blob()
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const downloadQR = () => {
    if (!qrCode) return
    const link = document.createElement('a')
    link.href = qrCode
    link.download = 'qrcode.png'
    link.click()
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          ⬜
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">QR Generator</h1>
          <p className="text-gray-500">Generate QR codes from text or URLs</p>
        </div>
      </div>

      <div className="max-w-xl">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && generateQR()}
          placeholder="Enter text or URL"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={generateQR}
          disabled={!text.trim() || loading}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? 'Generating...' : 'Generate QR Code'}
        </button>

        {loading && (
          <div className="mt-8 flex justify-center">
            <div className="w-48 h-48 bg-gray-100 rounded-lg animate-pulse" />
          </div>
        )}

        {qrCode && !loading && (
          <div className="mt-8">
            <div className="flex justify-center">
              <div className="p-4 bg-white border-2 border-gray-200 rounded-xl">
                <img src={qrCode} alt="QR Code" className="w-48 h-48" />
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={downloadQR}
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QRCodeGenerator
