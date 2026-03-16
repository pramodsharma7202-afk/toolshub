import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'

function ImageToPDFTool() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  const handleFiles = (e) => {
    const newFiles = Array.from(e.target.files)
    setFiles([...files, ...newFiles])
  }

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const convertToPDF = async () => {
    if (files.length === 0) return
    setLoading(true)

    try {
      const pdfDoc = await PDFDocument.create()
      
      for (const file of files) {
        const imageBytes = await file.arrayBuffer()
        let image
        
        if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(imageBytes)
        } else {
          image = await pdfDoc.embedJpg(imageBytes)
        }
        
        const page = pdfDoc.addPage([image.width, image.height])
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        })
      }
      
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = 'images-to-pdf.pdf'
      link.click()
    } catch (error) {
      console.error('Error converting to PDF:', error)
    }

    setLoading(false)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          🖼️
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Image to PDF</h1>
          <p className="text-gray-500">Convert images to PDF</p>
        </div>
      </div>

      <div className="max-w-xl space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="text-4xl mb-2">📁</div>
            <div className="text-gray-600">Click to upload images</div>
            <div className="text-sm text-gray-400 mt-1">PNG, JPG supported</div>
          </label>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm text-gray-500 mb-2">Images ({files.length}):</div>
            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <img 
                  src={URL.createObjectURL(file)} 
                  alt={file.name} 
                  className="w-10 h-10 object-cover rounded"
                />
                <div className="flex-1 text-sm text-gray-700 truncate">{file.name}</div>
                <button onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">✕</button>
              </div>
            ))}
          </div>
        )}

        <button 
          onClick={convertToPDF}
          disabled={files.length === 0 || loading}
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
      </div>
    </div>
  )
}

export default ImageToPDFTool
