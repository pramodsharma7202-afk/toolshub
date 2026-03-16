import { Link } from 'react-router-dom'

function ToolLayout({ icon, title, description, children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors mb-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Tools
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center text-3xl">
              {icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
              <p className="text-gray-500 dark:text-gray-400">{description}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-500/5 dark:shadow-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}

export default ToolLayout
