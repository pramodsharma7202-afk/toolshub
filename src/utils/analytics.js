export const initGA = (measurementId) => {
  if (!measurementId || measurementId === 'G-YOUR_MEASUREMENT_ID') {
    console.warn('GA4: Invalid Measurement ID provided')
    return
  }

  window.gtag = function() {
    window.dataLayer.push(arguments)
  }
  window.dataLayer = window.dataLayer || []
  
  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    page_path: window.location.pathname,
    send_page_view: false
  })
}

export const pageview = (measurementId, path, title) => {
  if (!window.gtag || !measurementId) return
  
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href
  })
}

export const event = (action, category, label, value) => {
  if (!window.gtag) return
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}
