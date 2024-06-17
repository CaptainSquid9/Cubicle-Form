import React from 'react'
import ReactDOM from 'react-dom/client'
import {Intro} from './Stage 1/Intro'
import useSwipe from './Stage 1/useSwipe'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Intro />
  </React.StrictMode>,
)
