import { useState } from 'react'

function TemplateGenerator() {
  const [template, setTemplate] = useState('resume')
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    objective: '',
    experience: '',
    education: '',
  })
  const [generated, setGenerated] = useState(false)

  const templates = {
    resume: { title: 'Resume', icon: '📄' },
    invoice: { title: 'Invoice', icon: '🧾' },
    letter: { title: 'Letter', icon: '✉️' },
  }

  const generate = () => {
    setGenerated(true)
  }

  const download = () => {
    const content = `
${template.toUpperCase()}

${'='.repeat(50)}

${data.name}
${data.email} | ${data.phone}
${data.address}

${template === 'resume' ? `
OBJECTIVE
${data.objective}

EXPERIENCE
${data.experience}

EDUCATION
${data.education}
` : ''}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${template}.txt`
    link.click()
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          📋
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Template Generator</h1>
          <p className="text-gray-500">Create professional documents</p>
        </div>
      </div>

      <div className="max-w-xl space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-2">Select Template</label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(templates).map(([key, { title, icon }]) => (
              <button
                key={key}
                onClick={() => setTemplate(key)}
                className={`p-3 rounded-lg text-center ${
                  template === key
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-sm">{title}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Phone"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Address"
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {template === 'resume' && (
          <>
            <textarea
              placeholder="Career Objective"
              value={data.objective}
              onChange={(e) => setData({ ...data, objective: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={2}
            />
            <textarea
              placeholder="Work Experience"
              value={data.experience}
              onChange={(e) => setData({ ...data, experience: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={3}
            />
            <textarea
              placeholder="Education"
              value={data.education}
              onChange={(e) => setData({ ...data, education: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={2}
            />
          </>
        )}

        <div className="flex gap-2">
          <button 
            onClick={generate}
            className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
          >
            Preview
          </button>
          {generated && (
            <button 
              onClick={download}
              className="flex-1 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
            >
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TemplateGenerator
