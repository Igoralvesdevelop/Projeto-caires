import { useError } from './ErrorContext';
import './ErrorMessage.css';

const ErrorMessage = () => {
    const { errorMessage } = useError();

    return errorMessage ? <div className="error">{errorMessage}</div> : null;
};

export default ErrorMessage;
