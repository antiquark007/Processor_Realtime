import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CPUInfo from './pages/cpuInfo.jsx'
import './index.css'
import App from './App.jsx'
import Network from './test.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CPUInfo/>
    <Network/>
  </StrictMode>,
)
