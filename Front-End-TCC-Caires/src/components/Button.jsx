import { useNavigate } from "react-router-dom";

function Botão () {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/Fuciocondo');
    };

    return (
        <button onClick={handleClick}>Ir</button>
    );
}

export default Botão;