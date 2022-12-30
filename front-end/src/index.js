import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store.js';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { debounce } from 'debounce';
import { saveState } from './services/browserStorage.ts';

// on inscrit les changements du store
store.subscribe(
  // nous utilisons debounce pour enregistrer l'état une fois toutes les 800 ms
  // pour de meilleures performances en cas de changements multiples en peu de temps
  debounce(() => {
    saveState(store.getState());
  }, 800)
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* la route spécifique sera l'ensemnle des elements dans app, donc le router  */}
          <Route path='/*' element={<App />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
