import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.css'
import App from './App'
import { ThemeProvider } from './context/ThemeContext'
import { BrainFMPlayerProvider } from './context/BrainFMPlayerContext'
import GlobalFocusPlayer from './components/GlobalFocusPlayer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrainFMPlayerProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <GlobalFocusPlayer />
      </BrainFMPlayerProvider>
    </ThemeProvider>
  </StrictMode>
)
