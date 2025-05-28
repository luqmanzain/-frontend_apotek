import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectRoute = ({children}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/"); // Redirect ke halaman login jika tidak ada token
        }
    }, [token, navigate]);

    return token ? children : null;
};

export default ProtectRoute;
