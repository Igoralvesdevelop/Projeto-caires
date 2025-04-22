import React, { useState } from "react";
import "./Dropdown.css";

const DropdownWithRadios = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">

  
        <ul className="dropdown-options">
          <li>
            <label>
              <input
                type="radio"
                name="dropdown"
                value="Opção 1"
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
                value="Opção 2"
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
                value="Opção 3"
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
