// import { useState } from 'react';
// import { useEffect } from 'react';
import { selectCurrentToken } from '../../slices/auth/authSlice';
import { selectFirstNameUser, selectLastNameUser } from '../../slices/user/userSlice';
// import { useNavigate } from 'react-router-dom';
import { UserService } from '../../services/user.service';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../slices/user/userSlice';
// import { setCredentials } from '../../slices/auth/authSlice';

const DashboardPage = () => {
  // const navigate = useNavigate();

  const currentUserFirstName = useSelector(selectFirstNameUser);
  const currentUserLaststName = useSelector(selectLastNameUser);
  let token = useSelector(selectCurrentToken);

  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useMemo(() => {
    async function getUserData() {
      try {
        const userService = new UserService();
        const userDatas = await userService.getProfile(token);
        console.log('user data after post : ', userDatas);

        dispatch(
          setUser({
            firstName: userDatas.firstName,
            lastName: userDatas.lastName,
          })
        );
      } catch (error) {
        const messageErrorSave = error.toString();
        // setError(messageErrorSave);
        console.log('error : ', messageErrorSave);
      }
    }
    getUserData();
  }, [token, dispatch]);

  // const updateName = (firstName, lastName, token) => {
  //   const userService = new UserService();
  //   if (firstName.value !== currentUserFirstName) {
  //     dispatch(editUser(firstName, lastName));
  //     userService.editProfile(firstName, lastName, token);
  //   }
  //   if (lastName.value !== currentUserLaststName) {
  //     dispatch(editUser(lastName, firstName));
  //     userService.editProfile(lastName, firstName, token);
  //   }
  // };
  const handleClick = () => {
    const userService = new UserService();
    if (firstName !== currentUserFirstName || lastName !== currentUserLaststName) {
      // dispatch(editUser({ firstName, lastName }));
      userService.editProfile({
        firstName,
        lastName,
        token,
      });
    }
    // if (inputRefLastName.current.value !== currentUserLaststName) {
    //   dispatch(
    //     editUser({ firstName: currentUserFirstName }, { lastName: inputRefLastName.current.value })
    //   );
    //   userService.editProfile(
    //     { firstName: currentUserFirstName },
    //     { lastName: inputRefLastName.current.value },
    //     token
    //   );
    // }
  };

  // const userFirstName = localStorage.getItem('userFirstName');
  // const userLastName = localStorage.getItem('userLastName');
  // const handleUserInput = (e) => {
  //   let nameUserChanged = e.target.value;
  //   setUserFirstName(...nameUserChanged.split(' ')[0]);
  //   setUserLastName(...nameUserChanged.split(' ')[1]);
  // };

  return (
    <main className='main bg-dark'>
      <div className='header'>
        <h1>
          Welcome back
          <br />
          {currentUserFirstName + ' ' + currentUserLaststName}
        </h1>
        <div>
          <label htmlFor='firstName'></label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            placeholder={currentUserFirstName}
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
        </div>
        <br />
        <div>
          <label htmlFor='lastName'></label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            placeholder={currentUserLaststName}
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></input>
        </div>
        <button className='edit-button' onClick={handleClick}>
          Edit Name
        </button>
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
