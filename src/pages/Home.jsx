import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import loginContext from '../context/loginContext';

function Home() {
  const navigate = useNavigate();

  // const { email } = useContext(loginContext);

  const auth = localStorage.getItem('__secure');

  useEffect(() => {
    if (!auth) {
      return navigate('/signin');
    }
    const URL = process.env.REACT_APP_REQUEST_HOST ?? 'http://localhost:3006';
    const verify = async () => {
      const response = await fetch(`${URL}/verifytoken`, {
        headers: {
          Authorization: `Bearer ${auth}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      if (response.status === 500) {
        localStorage.removeItem('__secure');
        return navigate('/signin');
      }
    };
    return verify;
  }, [auth, navigate]);

  return <h1>home</h1>;
}

export default Home;
