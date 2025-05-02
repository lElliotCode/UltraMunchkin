import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PlayersProvider } from './context/playersContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlayersProvider >
      <App />
    </PlayersProvider>
  </StrictMode>,
)
