import './Tipo.css'
import React, { useState } from 'react'

const Tipo = () => {
    const [descricao, setDescricao] = useState("")
    const [dados, setDados] = useState([])
    return (
        <div>
            <h2>Tipos</h2>
            <div>
                <form>
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