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
        </div>
    )
}

export default Tipo