import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles.css'
import { PruebaApp } from './PruebaApp'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux' 
import  store  from './store/index'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PruebaApp />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
