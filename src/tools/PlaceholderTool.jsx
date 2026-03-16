import { useState } from 'react'

function PlaceholderTool({ name, description, icon }) {
  const [email, setEmail] = useState('')

  const notifyMe = () => {
    alert(`We'll notify ${email} when ${name} is available!`)
    setEmail('')
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
          <p className="text-gray-500">{description}</p>
        </div>
      </div>

      <div className="max-w-xl">
        <div className="p-8 bg-gray-50 rounded-xl text-center">
          <div className="text-5xl mb-4">🚧</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h2>
          <p className="text-gray-500 mb-6">This tool requires advanced processing capabilities. We're working on it!</p>
          
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email to get notified"
              className="flex-1 p-3 border border-gray-300 rounded-lg"
            />
            <button
              onClick={notifyMe}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
            >
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceholderTool
