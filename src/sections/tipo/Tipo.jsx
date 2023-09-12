import './Tipo.css'
import React, { useEffect, useState } from 'react'
import api from '../../api/Api'

const Tipo = () => {
    // Variaveis
    const [id, setId] = useState("")
    const [descricao, setDescricao] = useState("")
    const [dados, setDados] = useState([])
    const [editavel, setEditavel] = useState(false)

    //executar ao renderizar a pagina
    useEffect(() => {
        pegarTodos()
    }, [])

    // Funções
    const pegarTodos = async () => {
        try {
            const response = await api.get('/tipos')
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
    const salvar = async (e) => {
        e.preventDefault()
        try {
            if (descricao.length > 0) {
                const item = { descricao }

                const response = await api.post('/tipos', item)

                console.log(response.data)
                if (response.data) {
                    setDados([...dados, response.data])
                    // pegarTodos()
                } else {
                    console.log('Salvar retorno vazio.')
                }
            }
        } catch (error) {
            console.log("Erro ao salvar tipo: ", error)
        }
    }

    const editar = (item) => {
        setId(item.id)
        setDescricao(item.descricao)
        setEditavel(true)
    }

    const limpar = () => {
        setId("")
        setDescricao("")
        setEditavel(false)
    }


    const atualizar = async (e) => {
        e.preventDefault()
        try {
            if (descricao.length > 0) {
                const item = { descricao }

                const response = await api.put('/tipos/' + id, item)

                console.log(response.data)
                if (response.data) {
                    const updatedData = dados.map((dado) =>
                        dado.id === id ? { ...dado, descricao: response.data.descricao } : dado
                    );
                    setDados(updatedData);
                    limpar();
                    // pegarTodos()
                } else {
                    console.log('Salvar retorno vazio.')
                }
            }
        } catch (error) {
            console.log("Erro ao salvar tipo: ", error)
        }

    }

    const deletar = async (item) => {
        try {
            if (item) {
                await api.delete('/tipos/' + item.id)
                // pegarTodos()
                const novaColecao = dados.filter((dado) => dado.id !== item.id);
                setDados(novaColecao);
            }
        } catch (error) {
            console.log("Erro ao salvar tipo: ", error)
        }

    }

    return (
        <div>
            <h2>{editavel ? "Editar Tipo" : "Tipos"}</h2>
            <div>
                <form onSubmit={editavel ? atualizar : salvar}>
                    <div>
                        <label>Descricao</label>
                        <input type='text' value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                        <div>
                            <button type="submit">{editavel ? "Atualizar" : "Salvar"}</button>
                            <button onClick={() => limpar()}>Limpar</button>
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
                                    <button onClick={() => editar(item)}>Editar</button>
                                </td>
                                <td>
                                    <button onClick={() => deletar(item)}>Remover</button>
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