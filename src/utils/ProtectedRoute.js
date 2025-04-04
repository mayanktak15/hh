import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const user = useSelector((store) => store.user);
    const location = useLocation();
    
    if (!user) {
        // Save the attempted URL before redirect
        const currentPath = location.pathname + location.search;
        sessionStorage.setItem('intendedUrl', currentPath);
        return <Navigate to="/user" replace />;
    }

    return children;
};

export default ProtectedRoute;
