import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Header } from './header'
import { SubTitle } from './subTitle'
import { Picture } from './picture'
import woods from "./assets/woods.mp4"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Header />

      <SubTitle />

      <Picture />

      <div className='bg-amber-200'>
        <h3>subsub!!</h3>
      </div>

      <div className='bg-green-200'>
        <video width="600" loop autoPlay muted>
          <source src={woods} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


      <div className='bg-blue-300'>
        <p>this is loooooooooooooooong loooooong text</p>
      </div>
    </>
  )
}

export default App
