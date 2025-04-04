import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const user = useSelector((store) => store.user);
    const location = useLocation();
    
    if (!user) {
        // Save the attempted URL before redirect
        sessionStorage.setItem('intendedUrl', location.pathname);
        return <Navigate to="/user" />;
    }

    return children;
};

export default ProtectedRoute;
