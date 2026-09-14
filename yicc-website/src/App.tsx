import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NewHome from './pages/NewHome'
import About from './pages/About'
import Programs from './pages/Programs'
import Impact from './pages/Impact'
import Team from './pages/Team'
import Contact from './pages/Contact'
import Treeplanting from './pages/Treeplanting'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewHome />} />
        <Route path="/newhome" element={<NewHome />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/treeplanting" element={<Treeplanting />} />
      </Routes>
    </BrowserRouter>
  )
}
