import { useState, useRef } from 'react'

function ImageToPNG() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
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
      ctx.drawImage(img, 0, 0)
      setResult(canvas.toDataURL('image/png'))
      setLoading(false)
    }
    img.src = preview
  }

  const download = () => {
    if (!result) return
    const link = document.createElement('a')
    link.href = result
    link.download = 'converted.png'
    link.click()
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          🖼️
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Image to PNG</h1>
          <p className="text-gray-500">Convert images to PNG format</p>
        </div>
      </div>

      <div className="max-w-xl space-y-4">
        <input type="file" accept="image/*" onChange={handleFile} className="block w-full" />

        {preview && (
          <div className="p-2 bg-gray-100 rounded-xl">
            <img src={preview} alt="Preview" className="max-h-40 mx-auto" />
          </div>
        )}

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
          {loading ? 'Converting...' : 'Convert to PNG'}
        </button>

        <canvas ref={canvasRef} className="hidden" />

        {result && (
          <div className="space-y-2">
            <div className="p-2 bg-gray-100 rounded-xl">
              <img src={result} alt="PNG" className="max-h-60 mx-auto" />
            </div>
            <button 
              onClick={download}
              className="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
            >
              Download PNG
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageToPNG
