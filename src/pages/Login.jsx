import React, { useState } from 'react';
import { useNavigate, useResolvedPath, Link } from 'react-router-dom';
import imageLogin from '../assets/pikachu.svg';

import pikachuIcon from '../assets/pikachuIcon.svg';
import './login.css';

function Login() {
  const navigate = useNavigate();
  const path = useResolvedPath();
  path.pathname = '/';

  const URL = process.env.REACT_APP_REQUEST_HOST ?? 'http://localhost:3006';

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [err, setErr] = useState('');

  const emailValidator =
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i;

  let toggleButton =
    senha.length >= 6 && emailValidator.test(email) ? false : true;

  const handleChange = (target, callBack) => {
    const { value } = target;
    callBack(() => value);
    callBack(() => value);
  };

  const handleClick = () => {
    const login = {
      email,
      password: senha,
    };

    if (emailValidator.test(email) && senha) {
      const convertToString = JSON.stringify(login);
      const result = fetch(`${URL}/auth`, {
        headers: {
          'content-Type': 'application/json',
        },
        method: 'POST',
        body: convertToString,
      })
        .then((response) => response.json())
        .then((dados) => {
          if (dados.message) {
            return setErr(() => dados.message);
          }
          setErr(() => '');
          localStorage.setItem('__secure', dados.token);
          return navigate(path.pathname);
        });
      return result;
    }
  };

  return (
    <main className="conteiner">
      <div className="conteiner-img">
        <img className="img" src={imageLogin} alt="animate" />
      </div>
      <div className="conteiner-form">
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <img className="logo" src={pikachuIcon} alt="pikachu icon" />
          <div className="conteiner-inputs">
            <div className="conteiner-inputs-email">
              <input
                type="email"
                name={email}
                value={email}
                onChange={({ target }) => handleChange(target, setEmail)}
                id="email"
                placeholder=" "
                className="email"
              />
              <label for="email" className="label-email">
                Email
              </label>
            </div>
            <div className="conteiner-inputs-email">
              <input
                type="password"
                name={senha}
                value={senha}
                onChange={({ target }) => handleChange(target, setSenha)}
                id="password"
                placeholder=" "
                className="email"
              />
              <label for="password" className="label-email">
                Password
              </label>
            </div>
            <div className="containerUser">
              <p id="notExists">{err}</p>
              <Link to="/signup" className="registrar">
                Criar Conta
              </Link>
            </div>
            <button
              type="submit"
              className="button"
              disabled={toggleButton}
              onClick={() => handleClick()}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
