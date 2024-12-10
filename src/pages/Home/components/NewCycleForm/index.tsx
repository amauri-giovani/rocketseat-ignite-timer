import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'  // importando dessa forma pq essa lib não tem um export default
import { CyclesContext } from '../..'


const newCycleFormValidationSchema = zod.object({   // validando um objeto => {}
    // sintaxe min(valor_mínimo, mensagem_opcional)
    task: zod.string().min(1, "Informe a tarefa"),  // campos que serão validados
    minutesAmount: zod                              // no formulário
        .number()
        .min(5, "Intervalo permitido entre 5 e 60 minutos")
        .max(60, "Intervalo permitido entre 5 e 60 minutos"),
    // owner: zod.string().optional()  // se criarmos mais um campo usando o zod, já será reconhecido em NewCycleFormData
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext)
    const { register, handleSubmit, watch, reset, /*formState*/ } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })
    // o register retorna funções como onChange, onBlur, etc
    // se fizermos register(name_para_tag).(ponto) => podemos ver todas as funções

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                type="text"
                id="task"
                list="task-suggestions"
                placeholder="Dê um nome para seu projeto"
                disabled={!!activeCycle}
                {...register("task")}
            />

            <datalist id="task-suggestions">
                <option value="Projeto 1"></option>
                <option value="Projeto 2"></option>
                <option value="Projeto 3"></option>
                <option value="Banana"></option>
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmountInput
                type="number"
                id="minutesAmount"
                placeholder="00"
                step={5}
                min={5}
                max={60}
                disabled={!!activeCycle}
                {...register('minutesAmount', { valueAsNumber: true })}
            />

            <span>minutos.</span>
        </FormContainer>
    )
}