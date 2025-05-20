import React, { useState } from 'react';
import './SelectComponent.css';
import Title from "./Title";

const SelectComponent = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [cnpj, setCnpj] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onChange(value, cnpj); // Envia o nível de acesso e o CNPJ para o componente pai
  };

  const handleCnpjChange = (event) => {
    const formattedCnpj = formatCnpj(event.target.value);
    setCnpj(formattedCnpj);
    onChange(selectedOption, formattedCnpj); // Atualiza o CNPJ no componente pai
  };

  const formatCnpj = (value) => {
    return value
      .replace(/\D/g, "") // Remove tudo que não for dígito
      .replace(/^(\d{2})(\d)/, "$1.$2") // Adiciona o primeiro ponto
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") // Adiciona o segundo ponto
      .replace(/\.(\d{3})(\d)/, ".$1/$2") // Adiciona a barra
      .replace(/(\d{4})(\d)/, "$1-$2") // Adiciona o traço
      .slice(0, 18); // Limita ao tamanho do CNPJ
  };

  return (
    <div className="select-container">
      <label htmlFor="select" className="label-select">Nível de acesso:</label>
      <select
        id="select"
        value={selectedOption}
        onChange={handleChange}
        className="select-field"
      >
        <option value="" disabled>Selecione</option>
        <option value="funcionário">Funcionário</option>
        <option value="síndico">Síndico</option>
      </select>

      {selectedOption === "síndico" && (
        <div className="input-container">
          <div className="inpute-container">
            <Title>CNPJ do Condomínio:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite o CNPJ"
              id="cnpj"
              name="cnpj"
              value={cnpj}
              onChange={handleCnpjChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectComponent;
