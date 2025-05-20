import React, { useState } from "react";
import "./Dropdown.css";

const DropdownWithRadios = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onChange(value); // Envia o valor selecionado para o componente pai
  };

  return (
    <div className="dropdown">
      <ul className="dropdown-options">
        <li>
          <label>
            <input
              type="radio"
              name="dropdown"
              value="Feminino"
              checked={selectedOption === "Feminino"}
              onChange={handleOptionChange}
            />
            Feminino
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="dropdown"
              value="Masculino"
              checked={selectedOption === "Masculino"}
              onChange={handleOptionChange}
            />
            Masculino
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="dropdown"
              value="Outro"
              checked={selectedOption === "Outro"}
              onChange={handleOptionChange}
            />
            Outro
          </label>
        </li>
      </ul>
    </div>
  );
};

export default DropdownWithRadios;
