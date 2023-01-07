import './App.css';
// import Router from './Router/Router';

import Dashboard from './pages/Dashboard';
// import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import Layout from './store/slices/auth/Layout';
import RequireAuth from './store/slices/auth/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes  */}
        <Route index path='index' element={<Home />} />
        <Route path='sign-in' element={<Login />} />

        {/* protected routes  */}
        <Route element={<RequireAuth />}>
          <Route path='dashboard' element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
