import { useEffect, useState } from 'react'
import { CardPlayer } from './components/CardPlayer.jsx'

function App() {

  const [players, setPlayers] = useState([])
  const [onReset, setOnReset] = useState(false)

  useEffect(() => {
    setPlayers([
      { "name": "Mauro", "sex": "fem" },
      { "name": "Eze", "sex": "fem" },
      { "name": "Nico", "sex": "masc" },
      { "name": "Sergio", "sex": "masc" },
    ])
  }, [])

  const handleReset = () => {
    setOnReset(true)
    console.log(onReset)
    const idReset = setTimeout(() => {
      setOnReset(false)
    }, 300)
    return () => {
      clearTimeout(idReset)
    }
  }

  return (
    <>
      <h1 className=" text-amber-800 text-2xl text-center my-4">UltraMunchkin</h1>
      <button onClick={() => handleReset()} className='px-4 py-2 border border-gray-950 text-white rounded-full mx-4 cursor-pointer hover:bg-gray-800'>Reset</button>
      <div className="flex flex-col gap-4 max-w-[90%] m-auto">
        {players.map((player, index) => {
          return (
            <CardPlayer player={player} key={index} onReset={onReset} />
          )
        })}
      </div>
    </>
  )
}

export default App
