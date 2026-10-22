import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const container = document.getElementById('root')
if (!container) throw new Error('Root container #root was not found')

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
)

// Offline shell + soft-404 handling for GitHub Pages deep links.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`, { scope: import.meta.env.BASE_URL })
      .catch(() => undefined)
  })
}
