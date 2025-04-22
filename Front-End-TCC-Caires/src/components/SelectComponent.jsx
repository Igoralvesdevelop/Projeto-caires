import React, { useState } from 'react';
import './SelectComponent.css'

const SelectComponent = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="select-container">
      <label htmlFor="select" className="label-select">Nível de acesso:</label>
      <select id="select" value={selectedOption} onChange={handleChange} className="select-field">
        <option value="">Selecione</option>
        <option value="funcionário">Funcionário</option>
        <option value="síndico">Síndico</option>
        <option value="administração">Administração</option>
      </select>
      <p>Você selecionou: {selectedOption}</p>
    </div>
  );
};

export default SelectComponent;
