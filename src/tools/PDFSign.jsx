import { useState, useRef } from 'react'
import { PDFDocument, rgb, degrees } from 'pdf-lib'

function PDFSign() {
  const [file, setFile] = useState(null)
  const [signature, setSignature] = useState('')
  const [loading, setLoading] = useState(false)
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const startDrawing = (e) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
    setIsDrawing(true)
  }

  const draw = (e) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 2
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const addSignature = async () => {
    if (!file) return
    setLoading(true)

    try {
      const canvas = canvasRef.current
      const signatureDataUrl = canvas.toDataURL('image/png')
      
      const pdfDoc = await PDFDocument.load(await file.arrayBuffer())
      const pages = pdfDoc.getPages()
      const page = pages[0]
      const { width, height } = page.getSize()
      
      const signatureImage = await pdfDoc.embedPng(signatureDataUrl)
      const sigWidth = 150
      const sigHeight = (signatureImage.height / signatureImage.width) * sigWidth
      
      page.drawImage(signatureImage, {
        x: width - sigWidth - 20,
        y: 20,
        width: sigWidth,
        height: sigHeight,
      })
      
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = 'signed.pdf'
      link.click()
    } catch (error) {
      console.error('Error signing:', error)
    }

    setLoading(false)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          ✍️
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sign PDF</h1>
          <p className="text-gray-500">Add your signature to PDF</p>
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
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">{file.name}</div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Draw Your Signature</label>
              <div className="border-2 border-gray-300 rounded-xl bg-white">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={150}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="cursor-crosshair w-full"
                />
              </div>
              <button onClick={clearSignature} className="mt-2 text-sm text-red-500 hover:text-red-700">
                Clear
              </button>
            </div>
          </div>
        )}

        <button 
          onClick={addSignature}
          disabled={!file || loading}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? 'Signing...' : 'Add Signature'}
        </button>
      </div>
    </div>
  )
}

export default PDFSign
