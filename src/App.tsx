import './App.css'
import { Button } from '@material-tailwind/react'

const App = () => {
  console.log(import.meta.env.VITE_TMD_ACCESS_TOKEN)

  return (
    <>
      <h1>Filmia</h1>
      <Button>Button</Button>
    </>
  )
}

export default App
