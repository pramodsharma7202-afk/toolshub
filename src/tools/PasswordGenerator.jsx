import { useState, useEffect } from 'react'

function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [password, setPassword] = useState('')
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [copied, setCopied] = useState(false)
  const [strength, setStrength] = useState('medium')

  const generatePassword = () => {
    let charset = ''
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
    if (includeNumbers) charset += '0123456789'
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'

    if (!charset) return

    let result = ''
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(result)
    
    // Calculate strength
    let s = 0
    if (length >= 12) s++
    if (length >= 16) s++
    if (includeUppercase && includeLowercase) s++
    if (includeNumbers) s++
    if (includeSymbols) s++
    if (s <= 1) setStrength('weak')
    else if (s <= 3) setStrength('medium')
    else setStrength('strong')
  }

  useEffect(() => {
    generatePassword()
  }, [])

  const copyToClipboard = async () => {
    if (!password) return
    await navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getStrengthColor = () => {
    if (strength === 'weak') return 'bg-red-500'
    if (strength === 'medium') return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStrengthWidth = () => {
    if (strength === 'weak') return '33%'
    if (strength === 'medium') return '66%'
    return '100%'
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          🔐
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Password Generator</h1>
          <p className="text-gray-500">Create secure random passwords</p>
        </div>
      </div>

      <div className="max-w-xl space-y-6">
        {/* Password Display */}
        {password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Generated Password</span>
              <button
                onClick={copyToClipboard}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="p-4 bg-gray-900 rounded-xl">
              <code className="text-green-400 font-mono text-lg break-all">{password}</code>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Strength: {strength}</span>
                <span>{length} characters</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full ${getStrengthColor()} transition-all duration-300`} style={{ width: getStrengthWidth() }} />
              </div>
            </div>
          </div>
        )}

        {/* Length Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password Length: <span className="text-blue-600 font-bold">{length}</span>
          </label>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>4</span>
            <span>64</span>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
            <span className="text-sm">Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <input type="checkbox" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
            <span className="text-sm">Lowercase (a-z)</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
            <span className="text-sm">Numbers (0-9)</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
            <span className="text-sm">Symbols (!@#$)</span>
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Generate New Password
        </button>
      </div>
    </div>
  )
}

export default PasswordGenerator
