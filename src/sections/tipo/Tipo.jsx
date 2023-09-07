import './Tipo.css'
import React, { useEffect, useState } from 'react'
import api from '../../api/Api'

const Tipo = () => {
    // Variaveis
    const [descricao, setDescricao] = useState("")
    const [dados, setDados] = useState([])

    //executar ao renderizar a pagina
    useEffect(() => {
        pegarTodos()
    },[])
    
    // Funções
    const pegarTodos = () => {
        try {
            const response = api.get('/tipos')
            if (response.data) {
                console.log(response.data)
                setDados(response.data.data)
            } else {
                console.log("Array vazio")
                setDados([])
            }
        } catch (error) {
            console.log("Erro ao pegar todos: ", error)
        }

    }
    const salvar = (e) => {
        e.preventDefault()
        try {
            if (descricao.length > 0) {
                const item = { descricao }

                const response = api.post('/tipos', item)
                if (response.data) {
                    console.log(response.data)
                } else {
                    console.log('Salvar retorno vazio.')
                }
            }
        } catch (error) {
            console.log("Erro ao salvar tipo: ", error)
        }
    }

    const atualizar = (e) => {
        e.preventDefault()
    }

    const deletar = () => {

    }

    return (
        <div>
            <h2>Tipos</h2>
            <div>
                <form onSubmit={salvar}>
                    <div>
                        <label>Descricao</label>
                        <input type='text'
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                        <div>
                            <button type="submit">Salvar</button>
                            <button type="reset">Limpar</button>
                        </div>
                    </div>
                </form>
            </div>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Descrição</th>
                        <th>Criado em:</th>
                        <th>Atualizado em:</th>
                        <th colSpan={2}>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dados.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.descricao}</td>
                                <td>{item.created_at}</td>
                                <td>{item.updated_at}</td>
                                <td>
                                    <button>Editar</button>
                                </td>
                                <td>
                                    <button>Remover</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Tipo