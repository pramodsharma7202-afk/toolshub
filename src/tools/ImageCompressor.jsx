import { useState, useRef } from 'react'

function ImageCompressor() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [quality, setQuality] = useState(0.5)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const canvasRef = useRef(null)

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (f) {
      setFile(f)
      setOriginalSize(f.size)
      setResult(null)
      setPreview(URL.createObjectURL(f))
    }
  }

  const compress = () => {
    if (!file || !preview) return
    setLoading(true)
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const dataUrl = canvas.toDataURL('image/jpeg', quality)
      setResult(dataUrl)
      setCompressedSize(Math.round((dataUrl.length - 22) * 3 / 4))
      setLoading(false)
    }
    img.src = preview
  }

  const download = () => {
    if (!result) return
    const link = document.createElement('a')
    link.href = result
    link.download = 'compressed.jpg'
    link.click()
  }

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const savings = originalSize > 0 ? Math.round((1 - compressedSize / originalSize) * 100) : 0

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          📉
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Image Compressor</h1>
          <p className="text-gray-500">Compress images to reduce file size</p>
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
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Lower = smaller file</span>
            <span>Higher = better quality</span>
          </div>
        </div>

        <button 
          onClick={compress} 
          disabled={!file || loading}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? 'Compressing...' : 'Compress Image'}
        </button>

        <canvas ref={canvasRef} className="hidden" />

        {result && (
          <div className="space-y-4">
            <div className="flex justify-center gap-6 p-4 bg-gray-50 rounded-xl">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{formatSize(originalSize)}</div>
                <div className="text-sm text-gray-500">Original</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{formatSize(compressedSize)}</div>
                <div className="text-sm text-gray-500">Compressed</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{savings}%</div>
                <div className="text-sm text-gray-500">Saved</div>
              </div>
            </div>
            <div className="p-2 bg-gray-100 rounded-xl">
              <img src={result} alt="Compressed" className="max-h-60 mx-auto" />
            </div>
            <button 
              onClick={download}
              className="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
            >
              Download Compressed Image
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageCompressor
