import React from 'react'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import Counter from './components/Counter'

export default function App() {
  return (
    <div id="app">
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
          <img src={typescriptLogo} className="logo vanilla" alt="TypeScript logo" />
        </a>
        <h1>Vite + TypeScript</h1>
        <div className="card">
          <Counter />
        </div>
        <p className="read-the-docs">Click on the Vite and TypeScript logos to learn more</p>
      </div>
    </div>
  )
}
