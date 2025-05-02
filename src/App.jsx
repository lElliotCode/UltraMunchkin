import { useEffect, useState } from 'react'
import { CardPlayer } from './components/CardPlayer.jsx'
import { usePlayers } from './context/playersContext.jsx'
import { AddPlayerForm } from './components/AddPlayerForm.jsx'

function App() {
  const { players, resetAllPlayer } = usePlayers()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players))
  }, [players])


  return (
    <>
      <h1 className=" text-amber-800 text-2xl text-center my-4">UltraMunchkin</h1>

      <button onClick={() => resetAllPlayer()} className='p-2 hover:bg-zinc-700 ml-4 text-white  cursor-pointer'>
        Reset
      </button>

      <button onClick={() => setShowModal(prev => !prev)} className='cursor-pointer hover:bg-zinc-700 p-2'>
        Agregar Jugador
      </button>
      <section className={`absolute ${showModal ? 'flex' : 'hidden'} justify-center items-center w-[100%] h-[100%] z-10 top-0 bottom-0 left-0 right-0 m-auto`}>
        <AddPlayerForm setShowModal={setShowModal} />
      </section>
      <div className="flex flex-col gap-4 max-w-[90%] m-auto">
        {players && (
          players.map((player, index) => {
            return (
              <CardPlayer player={player} index={index} key={index} />
            )
          })
        )}
      </div>
    </>
  )
}

export default App
