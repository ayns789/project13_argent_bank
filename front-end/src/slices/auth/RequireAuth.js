import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';

const RequireAuth = () => {
  let token = useSelector(selectCurrentToken);
  let savedToken = localStorage.getItem('currentToken');
  if (!token && savedToken) {
    token = savedToken;
  }

  // récupérer l'emplacement dans la navigation
  const location = useLocation();
  // console.log('token RequireAuth : ', token);

  return token ? <Outlet /> : <Navigate to='/sign-in' state={{ from: location }} replace />;
};

export default RequireAuth;
