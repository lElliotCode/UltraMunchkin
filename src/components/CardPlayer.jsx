import { Strength } from "../assets/strength"
import { Bag } from "../assets/bag"
import { Level } from "../assets/level"
import { useState } from "react"
import { useEffect } from "react"
import { Button } from "./Button"

export function CardPlayer({ player, onReset }) {

    const [playerStats, setPlayerStats] = useState({ level: 1, equipment: 0 })

    const handleChange = (type, e) => {
        let value = e.target.value

        if (type === 'level') {
            value = value >= 1 ? value : 1
            setPlayerStats(prev => ({ ...prev, level: Math.min(value, 10) }))
        } else if (type === 'equipment') {
            value = value >= 0 ? value : 1

            setPlayerStats(prev => ({ ...prev, equipment: isNaN(parseInt(value)) ? 0 : Math.min(parseInt(value), 99) }))
        }
    }

    const increasePoints = (type) => {
        if (type === 'level') {
            setPlayerStats(prev => ({ ...prev, level: Math.min(playerStats.level + 1, 10) }))
        } else if (type === 'equipment') {
            setPlayerStats(prev => ({ ...prev, equipment: playerStats.equipment + 1 }))
        }
    }

    const decreasePoints = (type) => {
        if (type === 'level') {
            setPlayerStats(prev => ({ ...prev, level: Math.max(playerStats.level - 1, 1) }))
        } else if (type === 'equipment') {
            setPlayerStats(prev => ({ ...prev, equipment: Math.max(playerStats.equipment - 1, 0) }))
        }
    }

    const strengthTotal = playerStats.level + playerStats.equipment
    const strength = strengthTotal > 100 ? 100 : strengthTotal

    useEffect(() => {
        setPlayerStats(prev => ({ ...prev, level: 1, equipment: 0 }))
    }, [onReset])


    return (
        <>
            <div className="relative flex justify-between items-center border border-black p-4">
                <div>
                    <h2>{player.name}</h2>
                    <small className={player.sex === 'fem' ? 'text-red-300' : 'text-blue-300'}>{player.sex}</small>
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
                <button className="absolute bottom-0.5 left-3 cursor-pointer text-xs text-red-400 border border-red-950 p-1 rounded-md hover:bg-red-900 hover:text-white transition-all duration-400" onClick={() => setPlayerStats(prev => ({ ...prev, 'level': 1, 'equipment': 0 }))}>KILL</button>
            </div>
        </>
    )
}