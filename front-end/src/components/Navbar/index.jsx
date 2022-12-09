import imgBankTree from '../../assets/bank-tree.jpeg';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className='main-nav'>
      <Link className='main-nav-logo' to='/index'>
        <img className='main-nav-logo-image' src={imgBankTree} alt='Argent Bank Logo' />
        <h1 className='sr-only'>Argent Bank</h1>
      </Link>
      <div className='main-nav-content-sign-in'>
        <Link className='main-nav-item' to='./sign-in'>
          <FaUserCircle className='fa fa-user-circle' />
          Sign In
        </Link>
      </div>
    </nav>
  );
};

// {/* <a class='main-nav-logo' href='./index.html'> */}

export default Navbar;
