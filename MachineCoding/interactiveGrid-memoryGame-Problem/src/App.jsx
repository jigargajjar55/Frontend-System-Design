import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Grid from './components/Grid'

function App() {


  return (
 
      <div>
       <h1>Interactive Grid</h1>

       <div style={{minHeight: '60vh'}}>


        <Grid />
       </div>
      </div>
     
  )
}

export default App
