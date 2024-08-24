import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CurrencyContext from './CurrencyContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurrencyContext>
      <App />
    </CurrencyContext>
  </StrictMode>,
)
