import { useEffect, useState } from "react"

function avisarAPI() {
    console.log("Lista salva!")
}

export function ButtonUseEffect() {
    const [list, setList] = useState<string[]>([])
    const [filter, setFilter] = useState('')

    // Explicado abaixo (PROBLEMA) porque não devemos usar useState() nesse caso
    // const [filteredList, setFilteredList] = useState<string[]>([])

    // o useEffect recebe 2 params, sendo uma função e uma lista de variáveis a serem monitoradas
    // ele executa assim que o componente é exibido em tela e sempre que as variáveis forem alteradas
    useEffect(() => {
        if (list.length) {
            avisarAPI()
        }
    }, [list])

    // um exemplo de chamar o useEffect somente 1 vez, assim que o componente for renderizado
    // passamos então a lista vazia
    useEffect(() => {
        console.log("Primeira renderização")
        fetch("https://api.github.com/users/amaurirg/repos")
        .then(response => response.json())
        .then(data => {
            setList(data.map((item) => item.full_name))
        })
    }, [])

    // PROBLEMA: se usarmos esse novo useEffect abaixo, quando o componente for renderizado
    // pela primeira vez, chamará esse useEffect de novo fazendo uma nova atualização 
    // Isso ocorre porque estamos usando useState(). Nesse caso é melhor colocar em uma 
    // variável (const filteredList), sem armazenar estado e tudo funcionará igualmente
    // useEffect(() => {
    //     setFilteredList(list.filter(item => item.includes(filter)))
    // }, [filter])
    // Isso evita uma nova renderização do componente
    const filteredList = list.filter(item => item.includes(filter))

    function addToList() {
        setList(state => [...state, 'Novo item'])
    }

    return (
        <div>
            <input type="text" onChange={e => setFilter(e.target.value)} value={filter} />

            <button onClick={addToList}>Add List</button>
            <ul>
                {list.map(item => <li>{item}</li>)}
            </ul>
            <hr />
            <ul>
                {filteredList.map(item => <li>{item}</li>)}
            </ul>
        </div>
    )
}