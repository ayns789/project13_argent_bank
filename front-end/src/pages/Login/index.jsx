// import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../slices/auth/authSlice';
import { UserService } from '../../services/user.service';
// import { UserService } from '../../services/user.service';

// import axios from 'axios';

const LoginPage = () => {
  // éléments du formulaire
  const userRef = useRef();
  const errRef = useRef();
  // states
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  // navigation
  const navigate = useNavigate();
  // accès au reducer, sert à déclencher les actions du reducer
  const dispatch = useDispatch();

  // focus sur l'entrée du nom de l'utilisateur quand le composant se charge
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // effacer le message d'erreur s'il y en avait un, pour le remettre à jour, si l'une des données change
  useEffect(() => {
    setErrMsg('');
  }, [email, pwd]);

  //   function parseJwt(token) {
  //     if (!token) {
  //       return;
  //     }
  //     const base64Url = token.split('.')[1];
  //     const base64 = base64Url.replace('-', '+').replace('_', '/');
  //     return JSON.parse(window.atob(base64));
  //   }

  // à la soumission du formulaire
  const handleSubmit = async (e) => {
    // bloquer l'événement car le formulaire pourrait provoquer un rechargement
    e.preventDefault();

    try {
      if (localStorage.key('currentToken')) {
        localStorage.removeItem('currentToken');
      }
      //   const userData = await axios.post('http://localhost:3001/api/v1/user/login', {
      //     email: email,
      //     password: pwd,
      //   });
      const userService = new UserService();
      // *** data from api :
      const userData = await userService.login(email, pwd);
      //   console.log('user : ', userData.data.body.token);
      //   console.log('parseToken : ', userData);
      //   const userInfToken = parseJwt(userData.data.body.token);
      //   console.log('userId : ', userInfToken.id);
      dispatch(setCredentials({ accessToken: userData.data.body.token, user: email }));

      //   const userService = new UserService();
      //   //   const user = { email: email, pwd: pwd };
      //   // *** data from api :
      //   const userDatasGet = await userService.getProfile({
      //     token: userData,
      //   });
      //   console.log('userDatasGet : ', userDatasGet);
      setEmail('');
      setPwd('');
      //   if (localStorage.key('currentToken')) {
      //     localStorage.removeItem('currentToken');
      //   }
      localStorage.setItem('currentToken', userData.data.body.token);
      navigate('/dashboard');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('no server response');
      } else if (err.response?.status === 400) {
        setErrMsg('login failed : username or password are not valid');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('login failed');
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setEmail(e.target.value);

  const handlePwdInput = (e) => setPwd(e.target.value);

  return (
    <main className='main bg-dark'>
      <section className='sign-in-content'>
        <FaUserCircle className='fa fa-user-circle sign-in-icon' />
        <h1>Sign In</h1>
        <p
          ref={errRef}
          className={errMsg ? 'errmsg' : 'offscreen'}
          aria-live='assertive'
          style={{ color: 'red' }}
        >
          {errMsg}
        </p>
        <form onSubmit={handleSubmit}>
          <div className='input-wrapper'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              ref={userRef}
              value={email}
              onChange={handleUserInput}
              autoComplete='off'
              required
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' onChange={handlePwdInput} value={pwd} required />
          </div>
          <div className='input-remember'>
            <input type='checkbox' id='remember-me' />
            <label htmlFor='remember-me'>Remember me</label>
          </div>
          <button className='sign-in-button'>Sign In</button>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
