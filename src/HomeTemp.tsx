import { createContext, useContext, useState } from "react"

// Criando um contexto vazio
const CyclesContext = createContext({} as any)

function NewCycle() {
    const { activeCycle, setActiveCycle } = useContext(CyclesContext)
    return (
        <h1>
            New Cycle: {activeCycle}
            <button
                onClick={() => {
                    setActiveCycle((state: number) => state + 1)
                }}
            >
                Alterar ciclo
            </button>
        </h1 >

    )
}

function Countdown() {
    const { activeCycle } = useContext(CyclesContext)
    return <h1>Countdown: {activeCycle}</h1>
}


export function HomeTemp() {
    const [activeCycle, setActiveCycle] = useState(0)
    return (
        // Envolvendo todos os componentes que utilizarão esse Context API
        // e passando value com as informações que poderão ser acessadas por eles
        <CyclesContext.Provider value={{activeCycle, setActiveCycle}}>
            <div>
                <NewCycle />
                <Countdown />
            </div>
        </CyclesContext.Provider>
    )
}