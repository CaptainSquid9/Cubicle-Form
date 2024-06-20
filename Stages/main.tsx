import React, {useId, Component }  from 'react'
import ReactDOM from 'react-dom/client'
import {Intro} from './Stage 1/Intro'
import HomePageRedirect from './HomePageRedirect'
import Fun from './Stage 2/FunQ'
import './index.css'
import { createRoot } from "react-dom/client";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <Routes>
      <Route path="/user/:id" element={<Fun/>} />
      <Route path="/" element={<HomePageRedirect />} />
    </Routes>
  </Router>
)
