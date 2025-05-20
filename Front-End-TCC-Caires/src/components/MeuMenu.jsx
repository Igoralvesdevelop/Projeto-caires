import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function MeuMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const abas = [
    { nome: "Moradores", rota: "/moradores" },
    { nome: "Servidor", rota: "/servidor" },
    { nome: "Visitantes", rota: "/visitantes" },
    { nome: "Veículos", rota: "/veiculos" },
    { nome: "Eventos", rota: "/eventos" },
    { nome: "Pedidos", rota: "/pedidos" },
  ];

  return (
    <div>
      <IconButton
        sx={{ color: "#fff", backgroundColor: "#6d3581", padding: "10px", borderRadius: "8px" }}
        aria-controls="menu-simples"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon sx={{ fontSize: 40 }} />
      </IconButton>

      <Menu
        id="menu-simples"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#6d3581", // Fundo roxo do menu
            color: "#fff", // Texto branco
          },
        }}
      >
        {abas.map((aba) => (
          <MenuItem
            key={aba.nome}
            onClick={() => {
              navigate(aba.rota);
              handleClose();
            }}
            sx={{
              "&:hover": {
                backgroundColor: "#4a235a", // Roxo mais escuro ao passar o mouse
              },
            }}
          >
            {aba.nome}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default MeuMenu;
