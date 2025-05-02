import { createContext, useContext, useState } from "react";

const PlayersContext = createContext()

export const usePlayers = () => useContext(PlayersContext)

export const PlayersProvider = ({ children }) => {
    const [players, setPlayers] = useState(() => {
        const stored = localStorage.getItem("players")
        return stored ? JSON.parse(stored) : []
    })

    const addPlayer = (player) => {
        setPlayers(prev => [...prev, player])
    }

    const updatePlayer = (index, type, value) => {

        setPlayers(prev =>
            prev.map((player, i) => {
                if (i !== index) return player

                const newValue = type === 'level'
                    ? Math.max(1, Math.min(value, 10))
                    : Math.max(0, Math.min(value, 99))

                return {
                    ...player,
                    [type]: isNaN(parseInt(newValue)) ? type === 'level' ? 1 : 0 : parseInt(newValue)
                }
            })
        )
    }

    const resetPlayer = (index) => {
        setPlayers(prev => {
            return prev.map((player, i) =>
                i === index ? { ...player, level: 1, equipment: 0 } : player
            )
        })
    }

    const resetAllPlayer = () => {
        setPlayers(prev =>
            prev.map(player => ({
                ...player, level: 1, equipment: 0
            }))
        )
    }

    const value = {
        players, addPlayer, updatePlayer, resetPlayer, resetAllPlayer
    }

    return (
        <PlayersContext.Provider value={value}>
            {children}
        </PlayersContext.Provider>
    )
}
