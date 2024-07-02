import React, {useId, Component }  from 'react'
import ReactDOM from 'react-dom/client'
import {Intro} from './Stage 1/Intro'
import HomePageRedirect from './HomePageRedirect'
import Color from './Stage 2/Color'
import Calculate from './Stage 3/Calculate';
import { GlobalDataProvider, useGlobalData} from './global'
import './index.css'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <GlobalDataProvider>
  <Router>
    <Routes>
      <Route path="/match/:id" element={<Intro/>} />
      <Route path="/match/:id/color" element={<Color/>} />
      <Route path="/match/:id/color/loading" element={<Calculate/>} />
      <Route path="/" element={<HomePageRedirect />} />
    </Routes>
  </Router>
  </GlobalDataProvider>
)
