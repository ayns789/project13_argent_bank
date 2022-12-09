// import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../slices/auth/authSlice';
// import { selectFirstNameUser, selectLastNameUser } from '../../slices/user/userSlice';
// import { useNavigate } from 'react-router-dom';
import { UserService } from '../../services/user.service';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/user/userSlice';
// import { setCredentials } from '../../slices/auth/authSlice';

const DashboardPage = () => {
  // const navigate = useNavigate();

  // const currentUserFirstName = useSelector((state) => state.user.firstName);
  // const currentUserFirstName = useSelector(selectFirstNameUser);
  // const currentUserLaststName = useSelector(selectLastNameUser);
  // const currentUserName = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  // const [userFirstNameStore, setUserFirstNameStore] = useState(null);
  // const [userLastNameStore, setUserLastNameStore] = useState(null);
  // const [userTokenStore, setUserTokenStore] = useState(null);

  // setUserFirstNameStore(currentUserFirstName);
  // setUserLastNameStore(currentUserLaststName);
  // setUserTokenStore(token);

  const dispatch = useDispatch();

  useMemo(() => {
    async function getUserData() {
      try {
        // if (localStorage.key('userFirstName')) {
        //   localStorage.removeItem('userFirstName');
        //   localStorage.removeItem('userLastName');
        // }
        const userService = new UserService();
        const userDatas = await userService.getProfile(token);

        console.log('user logged in : ', userDatas);

        localStorage.setItem('userFirstName', userDatas.firstName);
        localStorage.setItem('userLastName', userDatas.lastName);
        dispatch(
          setUser({
            firstName: userDatas.firstName,
            lastName: userDatas.lastName,
            accessToken: token,
          })
        );
        // dispatch(setCredentials({ accessToken: token, user: currentUserName }));
        // Placement of data in the useState
        // setUserData(userDatas);
      } catch (error) {
        const messageErrorSave = error.toString();
        // setError(messageErrorSave);
        console.log('error : ', messageErrorSave);
      }
    }
    getUserData();
  }, [token, dispatch]);

  const userFirstName = localStorage.getItem('userFirstName');
  const userLastName = localStorage.getItem('userLastName');

  return (
    <main className='main bg-dark'>
      <div className='header'>
        <h1>
          Welcome back
          <br />
          {userFirstName + ' ' + userLastName}
        </h1>
        <button className='edit-button'>Edit Name</button>
      </div>
      <h2 className='sr-only'>Accounts</h2>
      <section className='account'>
        <div className='account-content-wrapper'>
          <h3 className='account-title'>Argent Bank Checking (x8349)</h3>
          <p className='account-amount'>$2,082.79</p>
          <p className='account-amount-description'>Available Balance</p>
        </div>
        <div className='account-content-wrapper cta'>
          <button className='transaction-button'>View transactions</button>
        </div>
      </section>
      <section className='account'>
        <div className='account-content-wrapper'>
          <h3 className='account-title'>Argent Bank Savings (x6712)</h3>
          <p className='account-amount'>$10,928.42</p>
          <p className='account-amount-description'>Available Balance</p>
        </div>
        <div className='account-content-wrapper cta'>
          <button className='transaction-button'>View transactions</button>
        </div>
      </section>
      <section className='account'>
        <div className='account-content-wrapper'>
          <h3 className='account-title'>Argent Bank Credit Card (x8349)</h3>
          <p className='account-amount'>$184.30</p>
          <p className='account-amount-description'>Current Balance</p>
        </div>
        <div className='account-content-wrapper cta'>
          <button className='transaction-button'>View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
