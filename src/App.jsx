import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CardPlayer } from './components/CardPlayer.jsx'

function App() {

  const [players, setPlayers] = useState([])
  const [onReset, setOnReset] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const { register, handleSubmit } = useForm()

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

  // const handleAddPlayer = () => {

  // }

  return (
    <>
      <h1 className=" text-amber-800 text-2xl text-center my-4">UltraMunchkin</h1>
      <button onClick={() => handleReset()} className='p-2 hover:bg-zinc-700 ml-4 text-white  cursor-pointer'>Reset</button>
      <button onClick={() => setShowModal(prev => !prev)} className='cursor-pointer hover:bg-zinc-700 p-2'>Agregar Jugador</button>
      <section className={`bg-[#0f0f0f86] absolute ${showModal ? 'flex' : 'hidden'} justify-center items-center w-[80%] h-[60%] z-10 top-0 bottom-0 left-0 right-0 m-auto rounded-md`}>
        <button className='absolute top-5 right-5 rounded-full text-red-300 px-2 cursor-pointer border border-red-600' onClick={() => setShowModal(prev => !prev)}>X</button>
        <form className=' flex flex-col justify-center items-start gap-4'
          onSubmit={handleSubmit((values) => {
            console.log(values)
            setShowModal(prev => !prev)
          })}>
          <h2 className='text-center p-2 m-auto'>Agregar nuevo Jugador</h2>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" placeholder='Nombre o Alias' className='p-2 m-2' name='nombre' id='nombre' {...register('nombre')} />

          <div className='flex gap-2'>
            <label htmlFor="sex">Sexo</label>
            <select name="sex" id="" {...register('sex')}>
              <option value="femenino">♀️</option>
              <option value="masculino">♂️</option>
            </select>
          </div>

          <button>Agregar</button>
        </form>
      </section>
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
