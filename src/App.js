import React, { useContext, useEffect, useState } from 'react';
import './App.scss';

import useRoutes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

import Firebase from './context/firebaseContext';
import Preloader from './components/Preloader/Preloader';

function App() {

  // const localUserData = localStorage.getItem('userId');

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(false);
  // const [routes, setRoutes] = useState(useRoutes(false));
  const { auth } = useContext(Firebase);

  // useEffect(() => setLoading(false), [userId]);
  // useCallback(() => {
    
  // });
  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      console.log(
        'we don`t know who are you!', 
        // localStorage.getItem('userid')
      );
      setUserId(false);
      setLoading(false);
    } else {

      console.log(
        'we know who are you!', 
        // localStorage.getItem('userid')
      );
      auth.onAuthStateChanged(user => {
        setLoading(false);
        // console.log(user);

        if (user) {
          setUserId(user.uid);
          localStorage.setItem('userId', JSON.stringify(user.uid)); // user;
          // setRoutes(useRoutes(userId));
          
        } else {
          setUserId(false);
          localStorage.removeItem('userId');
        }

      })
      // .then(res => console.log('норм вроде'))
      // .catch(error => console.log(error));
    }
    
  }, [userId, auth]); 

  
  // useEffect(() => {
  //   console.log('#### userId: ',userId)
  //   setRoutes(useRoutes(userId));
  // }, [userId]);
  
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
