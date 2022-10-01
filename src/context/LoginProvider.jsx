import React, { useState } from 'react';

import loginContext from './loginContext';

function LoginProvider({ children }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <loginContext.Provider value={{
      login: 'olá',
      email,
      senha,
      setEmail,
      setSenha,
    }}>
      {children}
    </loginContext.Provider>
  );
}

export default LoginProvider;