import { Strength } from "../assets/strength"
import { Bag } from "../assets/bag"
import { Level } from "../assets/level"
import { useState } from "react"
import { useEffect } from "react"
import { Button } from "./Button"

export function CardPlayer({ player }) {

    const [level, setLevel] = useState(1)
    const [equipment, setEquipment] = useState(0)
    const [strength, setStrength] = useState(1)

    useEffect(() => {
        setStrength(level + equipment)
    }, [level, equipment])


    return (
        <>
            <div className="flex justify-between items-center border border-black p-4">
                <div>
                    <h2>{player.name}</h2>
                    <small className={player.sex === 'fem' ? 'text-red-300' : 'text-blue-300'}>{player.sex}</small>
                </div>
                <aside className="flex gap-4 justify-center items-center">
                    <section className="flex flex-col items-center">
                        <Level />
                        <div className="flex items-center gap-2">
                            <Button onClick={() => setLevel(level != 1 ? level - 1 : 1)} reason={'-'} />
                            {level}
                            <Button onClick={() => setLevel(level + 1)} reason={'+'} />
                        </div>
                    </section>
                    <section className="flex flex-col items-center">
                        <Bag />
                        <div className="flex items-center gap-2">
                            <button onClick={() => setEquipment(equipment != 0 ? equipment - 1 : 0)}>-</button>
                            {equipment}
                            <button onClick={() => setEquipment(equipment + 1)}>+</button>
                        </div>
                    </section>
                    <section className="flex flex-col items-center">
                        <Strength />
                        {strength}
                    </section>
                </aside>
            </div>
        </>
    )
}