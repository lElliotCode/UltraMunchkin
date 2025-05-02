import { usePlayers } from '../context/playersContext'
import { useForm } from 'react-hook-form'

export function AddPlayerForm({ setShowModal }) {

    const { addPlayer } = usePlayers()
    const { register, formState: { errors }, handleSubmit, resetField } = useForm()


    const onSubmit = handleSubmit((values) => {
        addPlayer(
            {
                name: values.name,
                sex: values.sex,
                level: 1,
                equipment: 0
            }
        )
        setShowModal(false)
        resetField('name')
    })

    return (
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
    )
}