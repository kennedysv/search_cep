//Importações de Bibliotecas e Componentes
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./styles.css";
import api from "./services/api";
import InputMask from "react-input-mask";
import swal from 'sweetalert'

function App() {
  //Declaração de Variáveis useState
  const [campo, setCampo] = useState("");
  const [cep, setCep] = useState("");

  //Função Assíncrona para Consultar o CEP
  async function searchCep() {
    if (campo === "") {
      swal("Atenção", "Digite um CEP", "info");
      return;
    }

    //Estrutura de Tratamento de Erros
    try {
      const response = await api.get(`${campo}/json`);
      setCep(response.data);
      setCampo("");
    } catch {
      swal("Erro de Busca", "Erro de Requisição", "error");
      setCampo("");
    }
  }
  return (
    <div className="container">
      <h1 className="titulo">Consulte CEP</h1>

      <div className="containerInput">
        <InputMask mask= {"99999-999"}
          placeholder="Busque o CEP"
          value={campo}
          onChange={(e) => setCampo(e.target.value)}
        />

        <button className="buttonSearch" onClick={searchCep}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {/* //Exibição dos Resultados */}
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
