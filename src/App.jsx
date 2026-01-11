import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [titleValue, setTitleValue] = useState('');
  const [authorValue, setAuthorValue] = useState('');

  return (
    <>
      <input onChange={(e)=> setTitleValue(e.target.value)} value={titleValue} />
      <input onChange={(e)=> setAuthorValue(e.target.value)} value={authorValue} />
    </>
  )
}

export default App