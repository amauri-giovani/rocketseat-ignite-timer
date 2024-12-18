import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { useForm } from 'react-hook-form'
import { createContext, useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";




// ao invés de criar uma interface, podemos utilizar o infer do zod que já cria automaticamente
// interface NewCycleFormData {
//     task: string,
//     minutesAmount: number
// }


interface Cycle {
    id: string
    task: string
    minutesAmount: number,
    startDate: Date,
    interruptDate?: Date,
    finishedDate?: Date
}

interface CyclesContextType {
    activeCycle: Cycle | undefined; // caso não exista ciclo ativo
    activeCycleId: string | null,
    markCurrentCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null) // pode não existir ciclo ativo



    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
    // console.log("activeCycle =", activeCycle)

    function markCurrentCycleAsFinished() {
        setCycles((state) => state.map((cycle) => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
            } else {
                return cycle
            }
        }))
    }

    // function handleCreateNewCycle(data: NewCycleFormData) {
    //     // data são os dados dos inputs do form
    //     // exemplo para ver => console.log(data)
    //     const id = String(new Date().getTime()) // converte para milisegundos
    //     const newCycle: Cycle = {
    //         id,
    //         task: data.task,
    //         minutesAmount: data.minutesAmount,
    //         startDate: new Date()
    //     }
    //     setCycles((state) => [...state, newCycle])
    //     setActiveCycleId(id)
    //     setAmountSecondsPassed(0)
    //     reset()
    // }

    function handleInterruptCycle() {
        setCycles(cycles.map(cycle => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, interruptDate: new Date() }
            } else {
                return cycle
            }
        })
        )
        setActiveCycleId(null)
    }

    // console.log(formState.errors)   // imprime os erros no formulário

    // const task = watch('task')
    // const isSubmitDisabled = !task

    console.log("cycles =", cycles)

    return (
        <HomeContainer>
            <form /*onSubmit={handleSubmit(handleCreateNewCycle)}*/ action="">
                <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}>
                    {/* <NewCycleForm /> */}
                    <Countdown />
                </CyclesContext.Provider>


                {activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptCycle} type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton type="submit" /*disabled={isSubmitDisabled}*/>
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )

                }

            </form>
        </HomeContainer>
    )
}