import './Tipo.css'
import React, { useState } from 'react'

const Tipo = () => {
    const [descricao, setDescricao] = useState("")
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
                    <tr>
                        <td>1</td>
                        <td>Cancelado</td>
                        <td>'2023-09-06 00:00:00"</td>
                        <td>'2023-09-06 00:00:00"</td>
                        <td>
                            <button>Editar</button>
                        </td>
                        <td>
                            <button>Remover</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Tipo