import { FaUserCircle } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { logIn } from '../../store/slices/auth/authSlice';
import { getLogin } from '../../store/slices/auth/authSlice';
// import { UserService } from '../../services/user.service';

const LoginPage = () => {
  // éléments du formulaire
  const userRef = useRef();
  const errRef = useRef();
  // states
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
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

  // à la soumission du formulaire
  const handleSubmit = async (e) => {
    // bloquer l'événement car le formulaire pourrait provoquer un rechargement
    e.preventDefault();

    try {
      // const userService = new UserService();
      // const userData = await userService.login(email, pwd);

      // console.log('user : ', userData);

      // dispatch(
      //   logIn({ accessToken: userData.data.body.token, user: email, rememberMe, connecting: true })
      // );

      dispatch(getLogin({ email, pwd, rememberMe }));

      setEmail('');
      setPwd('');

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

  const toggleRememberMe = () => {
    setRememberMe((current) => !current);
  };

  return (
    <>
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
                // autoComplete='off'
                required
              />
            </div>
            <div className='input-wrapper'>
              <label htmlFor='password'>Password</label>
              <input type='password' id='password' onChange={handlePwdInput} value={pwd} required />
            </div>
            <div className='input-remember'>
              <input type='checkbox' id='remember-me' onChange={toggleRememberMe} />
              <label htmlFor='remember-me'>Remember me</label>
            </div>
            <button className='sign-in-button'>Sign In</button>
          </form>
        </section>
      </main>
    </>
  );
};
// onChange={toggleRememberMe}

export default LoginPage;
