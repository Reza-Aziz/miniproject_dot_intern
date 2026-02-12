import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Register from './pages/register'
import Login from './pages/login'
import './Index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Register />
    </>
  )
}

export default App
