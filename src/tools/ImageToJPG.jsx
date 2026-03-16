import { useState, useRef } from 'react'

function ImageToJPG() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [quality, setQuality] = useState(0.92)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const canvasRef = useRef(null)

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (f) {
      setFile(f)
      setResult(null)
      setPreview(URL.createObjectURL(f))
    }
  }

  const convert = () => {
    if (!file || !preview) return
    setLoading(true)
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
      setResult(canvas.toDataURL('image/jpeg', quality))
      setLoading(false)
    }
    img.src = preview
  }

  const download = () => {
    if (!result) return
    const link = document.createElement('a')
    link.href = result
    link.download = 'converted.jpg'
    link.click()
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          📷
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Image to JPG</h1>
          <p className="text-gray-500">Convert images to JPG format</p>
        </div>
      </div>

      <div className="max-w-xl space-y-4">
        <input type="file" accept="image/*" onChange={handleFile} className="block w-full" />

        {preview && (
          <div className="p-2 bg-gray-100 rounded-xl">
            <img src={preview} alt="Preview" className="max-h-40 mx-auto" />
          </div>
        )}

        <div>
          <label className="block text-sm text-gray-600 mb-2">Quality: {Math.round(quality * 100)}%</label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={quality}
            onChange={(e) => setQuality(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <button 
          onClick={convert} 
          disabled={!file || loading}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? 'Converting...' : 'Convert to JPG'}
        </button>

        <canvas ref={canvasRef} className="hidden" />

        {result && (
          <div className="space-y-2">
            <div className="p-2 bg-gray-100 rounded-xl">
              <img src={result} alt="JPG" className="max-h-60 mx-auto" />
            </div>
            <button 
              onClick={download}
              className="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
            >
              Download JPG
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageToJPG
