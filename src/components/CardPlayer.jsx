import { Strength } from "../assets/strength"
import { Bag } from "../assets/bag"
import { Level } from "../assets/level"
import { Button } from "./Button"
import { usePlayers } from "../context/playersContext"

export function CardPlayer({ player, index }) {

    const { players, updatePlayer, resetPlayer } = usePlayers()

    const incrementStat = (index, type) => {
        updatePlayer(index, type, players[index][type] + 1)
    }

    const decrementStat = (index, type) => {
        updatePlayer(index, type, players[index][type] - 1)
    }


    return (
        <>
            <div className="relative flex justify-between items-center border border-black p-4" key={index}>
                <div>
                    <h2>{player.name}</h2>
                    <small className={player.sex === 'femenino' ? 'text-red-300' : 'text-blue-300'}>{player.sex === 'femenino' ? '♀️' : '♂️'}</small>
                </div>
                <aside className="flex gap-4 justify-center items-center">
                    <section className="flex flex-col items-center justify-center">
                        <Level />
                        <div className="flex items-center gap-2">
                            <Button onClick={() => {
                                decrementStat(index, 'level')
                            }} reason={'-'} />
                            <input type="text" className="border-none outline-none w-4.5 text-center" value={player.level} onChange={(e) => updatePlayer(index, 'level', e.target.value)} />
                            <Button onClick={() => incrementStat(index, 'level')} reason={'+'} />
                        </div>
                    </section>
                    <section className="flex flex-col items-center">
                        <Bag />
                        <div className="flex items-center gap-2">
                            <Button onClick={() => decrementStat(index, 'equipment')} reason={'-'} />
                            <input type="text" className="border-none outline-none w-4.5 text-center" value={player.equipment} onChange={(e) => updatePlayer(index, 'equipment', e.target.value)} />
                            <Button onClick={() => incrementStat(index, 'equipment')} reason={'+'} />
                        </div>
                    </section>
                    <section className="flex flex-col items-center">
                        <Strength />
                        {Math.min(player.level + player.equipment, 99)}
                    </section>
                </aside>
                <button className="absolute top-0 bottom-0 left-0 right-0 m-auto cursor-pointer text-xs text-red-400 border border-red-950 p-1 rounded-md active:bg-red-900 hover:text-white transition-all duration-100 w-max h-max active:w-full active:h-full" onClick={() => resetPlayer(index)}>KILL</button>
            </div>
        </>
    )
}