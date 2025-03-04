import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProcessorSpeedChecker from './test.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ProcessorSpeedChecker/>
  </StrictMode>,
)
