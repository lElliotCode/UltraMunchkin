import { useState } from "react"

export function usePlayerStats() {
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


    const resetStats = () => {
        setPlayerStats(prev => ({ ...prev, level: 1, equipment: 0 }))
    }

    return { decreasePoints, strength, increasePoints, handleChange, playerStats, resetStats }
}