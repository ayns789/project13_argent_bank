import { useLocation, useNavigate, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentRememberMe } from './authSlice';
import { useMemo } from 'react';
// import { getLogin } from './authSlice';
// useRef , useState, useEffect
// useNavigate

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  // console.log('auth reducer : ', auth);
  // const [newToken, setNewToken] = useState('');
  const rememberMe = useSelector(selectCurrentRememberMe);
  // const [newRememberMe, setNewRememberMe] = useState(false);
  // password456
  // useEffect(() => {
  //   setNewRememberMe(rememberMe);
  // }, [rememberMe]);

  // useEffect(() => {
  //   setNewToken(token);
  // }, [token]);

  // useEffect(() => {
  //   if (!newToken) {
  //     setTimeout(() => {
  //       setNewToken(token);
  //       setNewRememberMe(rememberMe);
  //     }, 1000);
  //   }
  // }, [newToken, rememberMe, token]);
  // if (!newToken) {
  //   setTimeout(() => {
  //     setNewToken(token);
  //     setNewRememberMe(rememberMe);
  //   }, 1000);
  // } else {
  // }
  // récupérer l'emplacement dans la navigation
  const location = useLocation();
  // const firstLoadRef = useRef(true);
  const navigate = useNavigate();
  console.log('remerberMe value in requireAuth : ', rememberMe);

  const haveAccess = useMemo(() => {
    console.log('token valeur au départ : ', token);
    if (!token) {
      const test = localStorage.getItem('redux');
      console.log('test : ', test);
    }
    console.log('requireAuth remerberMe value : ', rememberMe);
    // if (firstLoadRef.current) {
    // console.log(location.pathname);
    // firstLoadRef.current = false;
    // if (token && rememberMe) {
    if (token && rememberMe && location.pathname === '/sign-in') {
      console.log('requireAuth first condition value');
      // if (location.pathname === '/sign-in') {
      navigate('/dashboard');
      // }

      return true;
      // }
      // if (token && rememberMe) {
      //   navigate('/dashboard');
      //   return true;
      // }
    } else if (token) {
      console.log('requireAuth token validate');
      return true;
    }
    // }
    console.log('requireAuth problem ^^');
    return false;
  }, [location.pathname, navigate, rememberMe, token]);

  // console.log('token RequireAuth : ', token);

  return haveAccess ? <Outlet /> : <Navigate to='/sign-in' state={{ from: location }} replace />;
};

export default RequireAuth;
