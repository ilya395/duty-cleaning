import React, { useContext, useEffect, useState } from 'react';
import './App.scss';

import useRoutes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

import Firebase from './context/firebaseContext';
import Preloader from './components/Preloader/Preloader';

function App() {

  const localUserData = localStorage.getItem('userId');

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(false);
  const { auth } = useContext(Firebase);

  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      console.log('we don`t know who are you!', localStorage.getItem('userid'));
      setUserId(false);
    } else {

      auth.onAuthStateChanged(user => {
        setLoading(false);

        console.log(user);

        if (user) {
          localStorage.setItem('userId', JSON.stringify(user.uid)); // user;
          setUserId(user.uid);
        } else {
          localStorage.removeItem('userId');
          setUserId(null);
        }

      });

    }
  }, [userId, auth, localUserData]); 
  
  const routes = useRoutes(userId); 

  if (loading) {
    return (
      <Preloader />
    );
  }

  return (
    <>
      <Router>
        {routes}
      </Router> 
    </>
  );
}

export default App;
