import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { pageview } from '../utils/analytics'

const GA_MEASUREMENT_ID = 'G-C6716WMMY1'

export default function Analytics() {
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname + location.search
    const title = document.title
    
    pageview(GA_MEASUREMENT_ID, path, title)
  }, [location])

  return null
}
