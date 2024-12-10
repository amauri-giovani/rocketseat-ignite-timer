import { useContext, useEffect, useState } from 'react'
import { CountdownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../..'


export function Countdown() {
    const { activeCycle, activeCycleId, markCurrentCycleAsFinished } = useContext(CyclesContext)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    // Exemplo sem zerar o interval e os segundos passados
    // useEffect(() => {
    //     if (activeCycle) {
    //         setInterval(() => {
    //             setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
    //         }, 1000)
    //     }
    // }, [activeCycle])   // sempre que usar uma variável externa, colocamos no useEffect()

    // o UseEffect pode ter um retorno e nesse caso usaremos para resetar o interval e os segundos
    useEffect(() => {
        let interval: number

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date(),
                    activeCycle.startDate
                )

                if (secondsDifference >= totalSeconds) {
                    markCurrentCycleAsFinished()
                    setAmountSecondsPassed(totalSeconds)
                    clearInterval(interval)
                } else {
                    setAmountSecondsPassed(secondsDifference)
                }
            }, 1000)
        }
        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, activeCycleId, totalSeconds, markCurrentCycleAsFinished])   // sempre que usar uma variável externa, colocamos no useEffect()

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, "0")
    const seconds = String(secondsAmount).padStart(2, "0")

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])

    return (
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>
    )
}