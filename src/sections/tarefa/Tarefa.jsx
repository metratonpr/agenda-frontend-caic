import React, { useEffect, useState } from "react";
import api from "../../api/Api";


const Tarefa = () => {
    const [tarefas, setTarefas] = useState([])
    const [tipos, setTipos] = useState([])
    const [formulario, setFormulario] = useState({
        id: "",
        data: "",
        assunto: "",
        descricao: "",
        contato: "",
        tipo_id: "",
        editable: false
    })

    const limpar = () => {

        const initial_state = {
            id: "",
            data: "",
            assunto: "",
            descricao: "",
            contato: "",
            tipo_id: "",
            editable: false
        }

        setFormulario(initial_state)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    useEffect(() => {
        carregarTipos()
        carregarTarefas()
    }, [])

    const carregarTipos = async () => {
        try {
            const response = await api.get('/tipos')
            if (response.data) {
                console.log(response.data)
                setTipos(response.data.data)
            } else {
                console.log("Array vazio")
                setTipos([])
            }
        } catch (error) {
            console.log("Erro ao pegar tipos: ", error)
        }

    }
    const carregarTarefas = async () => {
        try {
            const response = await api.get('/tarefas')
            if (response.data) {
                console.log(response.data)
                setTarefas(response.data.data)
            }
        } catch (error) {
            console.log("Erro ao pegar tipos: ", error)
        }

    }

    const criar = async (e) => {
        e.preventDefault()
        try {
            if (formulario.assunto.length > 0) {
                const { id, editable, ...novo } = formulario
                console.log(novo)
                const response = await api.post('/tarefas', novo)
                if (response.data) {
                    setTarefas([...tarefas, response.data])
                    limpar()
                }
            }
        } catch (error) {
            console.log("Erro ao salvar a tarefa: ", error)
        }
    }

    const editar = (item) => {
        const itemComEditable = {
            ...item,
            editable: true
        };
        setFormulario(itemComEditable);
    }

    const atualizar = async (e) => {
        e.preventDefault()
        try {
            if (formulario.assunto.length > 0) {
                const { id, editable, ...alterado } = formulario
                const response = await api.put('/tarefas/' + id, alterado)
                if (response.data) {
                    const updatedData = tarefas.map((dado) =>
                        dado.id === id ? { ...dado, descricao: response.data.descricao } : dado
                    );
                    setTarefas(updatedData);
                    limpar();
                }
            }
        } catch (error) {
            console.log("Erro ao atualizar a tarefa: ", error)
        }
    }

    const deletar = async (item) => {
        try {
            if (item) {
                await api.delete('/tarefas/' + item.id)
                // pegarTodos()
                const novaColecao = tarefas.filter((dado) => dado.id !== item.id);
                setTarefas(novaColecao);
            }
        } catch (error) {
            console.log("Erro ao deletar tarefa: ", error)
        }

    }

    // 'data', 'assunto', 'descricao', 'contato', 'tipo_id'
    return (
        <div>
            <h2>{formulario.editavel ? "Atualizar Tarefa" : "Criar Tarefa"}</h2>
            <form onSubmit={formulario.editavel ? atualizar : criar}>
                <div>
                    <label htmlFor="data">Data</label>
                    <input type="date" id="data" name="data" value={formulario.data} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="assunto">Assunto</label>
                    <input type="text" id="assunto" name="assunto" value={formulario.assunto} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="descricao">Descricao</label>
                    <textarea name="descricao" id="descricao" cols="30" rows="10" value={formulario.descricao} onChange={handleInputChange} ></textarea>
                </div>
                <div>
                    <label htmlFor="contato">Contato</label>
                    <input type="text" id="contato" name="contato" value={formulario.contato} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="tipo_id">Tipo</label>
                    <select name="tipo_id" id="tipo_id" value={formulario.tipo_id} onChange={handleInputChange} >
                        <option value="" disabled>Selecione um tipo</option>
                        {
                            tipos.map((item, index) => (
                                <option value={item.id} key={index}>{item.descricao}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <button type="submit">{formulario.editavel ? "Atualizar" : "Salvar"}</button>
                    <button onClick={() => limpar()}>Limpar</button>
                </div>
            </form>

            <hr />

            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Data</th>
                        <th>Assunto</th>
                        <th>Descrição</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tarefas.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.data}</td>
                                <td>{item.assunto}</td>
                                <td>{item.descricao}</td>
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

export default Tarefa