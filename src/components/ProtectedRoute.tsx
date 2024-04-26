import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Key } from '../enum/cache.key';
import { toastError } from '../services/ToastService';

const ProtectedRoute = () => {
    const isLoggedIn: boolean = JSON.parse(localStorage.getItem(Key.LOGGEDIN)) as boolean || false;
    const location = useLocation();
    
    if (isLoggedIn) {
        return <Outlet />;
    } else {
        toastError('You\'re not logged in');
        return <Navigate to={'/login'} replace state={{ from: location }} />;
    }
};

export default ProtectedRoute;