import { useEffect, useState } from 'react'
import { CardPlayer } from './components/CardPlayer.jsx'

function App() {

  const [players, setPlayers] = useState([])

  useEffect(() => {
    setPlayers([
      { "name": "Mauro", "sex": "fem" },
      { "name": "Eze", "sex": "fem" },
      { "name": "Nico", "sex": "masc" },
      { "name": "Sergio", "sex": "masc" },
    ])
  }, [])

  return (
    <>
      <h1 className=" text-amber-800 text-2xl text-center my-4">UltraMunchkin</h1>
      <div className="flex flex-col gap-4 max-w-[90%] m-auto">
        {players.map((player, index) => {
          return (
            <CardPlayer player={player} key={index} />
          )
        })}
      </div>
    </>
  )
}

export default App
