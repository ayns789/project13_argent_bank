import imgBankTree from '../../assets/bank-tree.jpeg';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
// import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentToken } from '../../slices/auth/authSlice';
import { logOut } from '../../slices/auth/authSlice';

const Navbar = () => {
  // const location = useLocation();
  const dispatch = useDispatch();
  let token = useSelector(selectCurrentToken);

  return (
    <nav className='main-nav'>
      <Link className='main-nav-logo' to='/index'>
        <img className='main-nav-logo-image' src={imgBankTree} alt='Argent Bank Logo' />
        <h1 className='sr-only'>Argent Bank</h1>
      </Link>
      <div className='main-nav-content-sign-in'>
        {token ? (
          <Link className='main-nav-item' to='./sign-in' onClick={() => dispatch(logOut())}>
            <FaUserCircle className='fa fa-user-circle' />
            Logout
          </Link>
        ) : (
          <Link className='main-nav-item' to='./sign-in'>
            <FaUserCircle className='fa fa-user-circle' />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

// {/* <a class='main-nav-logo' href='./index.html'> */}

export default Navbar;
