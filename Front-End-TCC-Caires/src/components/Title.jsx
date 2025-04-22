import React from "react";
import PropTypes from "prop-types";
import "./Title.css"; // Arquivo CSS para estilos específicos (opcional)

const Title = ({ children, className }) => {
  return <h1 className={`title ${className}`}>{children}</h1>;
};

Title.propTypes = {
  children: PropTypes.node.isRequired, // Garante que o título sempre terá conteúdo
  className: PropTypes.string, // Permite personalizar classes adicionais
};

Title.defaultProps = {
  className: "", // Padrão vazio para classes
};

export default Title;
