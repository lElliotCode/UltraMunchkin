import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CardPlayer } from './components/CardPlayer.jsx'

function App() {

  const [players, setPlayers] = useState([])
  const [onReset, setOnReset] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const { register, formState: { errors }, handleSubmit, reset } = useForm()


  const handleReset = () => {
    setOnReset(true)
    console.log(onReset)
    const idReset = setTimeout(() => {
      setOnReset(false)
    }, 100)
    return () => {
      clearTimeout(idReset)
    }
  }

  const onSubmit = handleSubmit((values) => {
    setPlayers((prevPlayers) => [...prevPlayers, { ...values, level: 1, equipment: 1 }])
    setShowModal(false)
    reset()
  })

  return (
    <>
      <h1 className=" text-amber-800 text-2xl text-center my-4">UltraMunchkin</h1>

      <button onClick={() => handleReset()} className='p-2 hover:bg-zinc-700 ml-4 text-white  cursor-pointer'>
        Reset
      </button>

      <button onClick={() => setShowModal(prev => !prev)} className='cursor-pointer hover:bg-zinc-700 p-2'>
        Agregar Jugador
      </button>
      <section className={`absolute ${showModal ? 'flex' : 'hidden'} justify-center items-center w-[100%] h-[100%] z-10 top-0 bottom-0 left-0 right-0 m-auto`}>

        <form className='relative flex flex-col gap-4 bg-[#0f0f0f86] w-max h-max p-8'
          onSubmit={onSubmit}>
          <button className='absolute top-5 right-5 rounded-full text-red-300 px-2 cursor-pointer border border-red-600' type='reset' onClick={() => setShowModal(false)}>X</button>
          <h2 className='text-center p-2'>Agregar nuevo Jugador</h2>
          <div className='flex flex-col gap-2'>
            <div>
              <label htmlFor="name">Nombre:</label>
              <input
                type="text" placeholder='Nombre o Alias' name='name' id='name' className='outline-none border-b p-1 mx-1'
                {...register('name', {
                  required: {
                    value: true,
                    message: 'El campo es requerido'
                  },
                  minLength: {
                    value: 2,
                    message: 'Minimo 2 caracteres'
                  },
                  maxLength: {
                    value: 20,
                    message: 'Máximo 20 caracteres'
                  }
                })}
              />
            </div>

            {
              errors.name && <span className='pb-2 text-xs text-red-400'>{errors.name.message}</span>
            }

            <div className='flex gap-2'>
              <label htmlFor="sex">Sexo</label>
              <select name="sex" id="" {...register('sex')}>
                <option value="femenino">♀️</option>
                <option value="masculino">♂️</option>
              </select>
            </div>
          </div>

          <button>Agregar</button>
        </form>

      </section>
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
