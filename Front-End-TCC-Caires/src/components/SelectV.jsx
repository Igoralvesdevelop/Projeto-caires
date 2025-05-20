import React, { useState } from 'react';
import './SelectComponent.css'

const SelectV = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="select-container">
      <label htmlFor="select" className="label-select">Nível de acesso:</label>
      <select id="select" value={selectedOption} onChange={handleChange} className="select-field">
        <option value=""disabled>Selecione</option>
        <option value="Visitante comum">Visitante comum</option>
        <option value="Visitante permanente">Visitante permanente</option>
      </select>
      <p>Você selecionou: {selectedOption}</p>
    </div>
  );
};

export default SelectV;
