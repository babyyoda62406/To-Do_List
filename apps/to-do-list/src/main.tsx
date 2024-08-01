import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GlobalContextProvider } from './contexts/GlobalContext/GobalContext.tsx'
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GlobalContextProvider>
    <React.StrictMode>
      <HashRouter>
          <App />
      </HashRouter>
    </React.StrictMode>
  </GlobalContextProvider>
)
