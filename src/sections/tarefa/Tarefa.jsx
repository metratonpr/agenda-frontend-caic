import React, { useState } from "react";


const Tarefa = () => {
    const [formulario, setFormulario] = useState({
        id: "",
        data: "",
        assunto: "",
        descricao: "",
        contato: "",
        tipo_id: "",
        editable: false
    })
    // 'data', 'assunto', 'descricao', 'contato', 'tipo_id'
    return (
        <div>
            <h2>Tarefa</h2>
            <form action="">
                <div>
                    <label htmlFor="data">Data</label>
                    <input type="date" id="data" name="data" value={formulario.data} />
                </div>
                <div>
                    <label htmlFor="assunto">Assunto</label>
                    <input type="text" id="assunto" name="assunto" />
                </div>
                <div>
                    <label htmlFor="descricao">Descricao</label>
                    <textarea name="descricao" id="descricao" cols="30" rows="10"></textarea>
                </div>
                <div>
                    <label htmlFor="contato">Contato</label>
                    <input type="text" id="contato" name="contato" />
                </div>
                <div>
                    <label htmlFor="tipo_id">Tipo</label>
                    <select name="tipo_id" id="tipo_id">
                        <option value="" disabled>Selecione um tipo</option>
                    </select>
                </div>

            </form>
        </div>
    )
}

export default Tarefa