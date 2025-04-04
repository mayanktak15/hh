import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const user = useSelector((store) => store.user);
    const location = useLocation();
    
    if (!user) {
        // Save the attempted URL
        localStorage.setItem('intendedUrl', location.pathname);
        return <Navigate to="/user" state={{ from: location.pathname }} />;
    }

    return children;
};

export default ProtectedRoute;
