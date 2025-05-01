import { Strength } from "../assets/strength"
import { Bag } from "../assets/bag"
import { Level } from "../assets/level"
import { Button } from "./Button"
import { usePlayerStats } from "../hooks/usePlayerStats"

export function CardPlayer({ player }) {

    const { decreasePoints, increasePoints, playerStats, handleChange, strength, resetStats } = usePlayerStats()


    return (
        <>
            <div className="relative flex justify-between items-center border border-black p-4">
                <div>
                    <h2>{player.name}</h2>
                    <small className={player.sex === 'femenino' ? 'text-red-300' : 'text-blue-300'}>{player.sex === 'femenino' ? '♀️' : '♂️'}</small>
                </div>
                <aside className="flex gap-4 justify-center items-center">
                    <section className="flex flex-col items-center justify-center">
                        <Level />
                        <div className="flex items-center gap-2">
                            <Button onClick={() => decreasePoints('level')} reason={'-'} />
                            <input type="text" className="border-none outline-none w-4.5 text-center" value={playerStats.level} onChange={(e) => handleChange('level', e)} />
                            <Button onClick={() => increasePoints('level')} reason={'+'} />
                        </div>
                    </section>
                    <section className="flex flex-col items-center">
                        <Bag />
                        <div className="flex items-center gap-2">
                            <Button onClick={() => decreasePoints('equipment')} reason={'-'} />
                            <input type="text" className="border-none outline-none w-4.5 text-center" value={playerStats.equipment} onChange={(e) => handleChange('equipment', e)} />
                            <Button onClick={() => increasePoints('equipment')} reason={'+'} />
                        </div>
                    </section>
                    <section className="flex flex-col items-center">
                        <Strength />
                        {strength}
                    </section>
                </aside>
                <button className="absolute top-0 bottom-0 left-0 right-0 m-auto cursor-pointer text-xs text-red-400 border border-red-950 p-1 rounded-md active:bg-red-900 hover:text-white transition-all duration-100 w-max h-max active:w-full active:h-full" onClick={() => resetStats()}>KILL</button>
            </div>
        </>
    )
}