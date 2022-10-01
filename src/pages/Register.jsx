import React, { useState } from 'react';
import { useNavigate, useResolvedPath } from 'react-router-dom';

import snorlaxIcon from '../assets/snorlax.svg';
import './register.css';

function Register() {
  const navigate = useNavigate();
  const path = useResolvedPath();
  path.pathname = '/signin';

  const URL = process.env.REACT_APP_REQUEST_HOST ?? 'http://localhost:3006';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [err, setErr] = useState('');

  const emailValidator =
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i;

  let toggleButton =
    password.length >= 6 &&
    emailValidator.test(email) &&
    name.length > 0 &&
    repeatPassword.length >= 6
      ? false
      : true;

  const handleChange = (target, callBack) => {
    const { value } = target;
    callBack(() => value);
  };

  const handleClick = () => {
    const registro = {
      name,
      email,
      password,
    };

    if (password !== repeatPassword) {
      return setErr(() => 'As senhas não são iguais!');
    }

    if (emailValidator.test(email) && password && name) {
      const convertToString = JSON.stringify(registro);
      const result = fetch(`${URL}/register`, {
        headers: {
          'content-Type': 'application/json',
        },
        method: 'POST',
        body: convertToString,
      }).then((response) => {
        if (response.status === 201) {
          return navigate(path.pathname);
        }
      });
      return result;
    }
  };

  return (
    <main className="containerRegisterMain">
      <div className="conteiner-form">
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <img className="logo" src={snorlaxIcon} alt="snorlaxicon" />
          <div className="conteiner-inputs-register">
            <div className="conteiner-inputs-email">
              <input
                type="text"
                name={name}
                value={name}
                onChange={({ target }) => handleChange(target, setName)}
                id="name"
                placeholder=" "
                className="email"
              />
              <label for="email" className="label-email">
                Full name
              </label>
            </div>
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
                name={password}
                value={password}
                onChange={({ target }) => handleChange(target, setPassword)}
                id="password"
                placeholder=" "
                className="email"
              />
              <label for="password" className="label-email">
                Password
              </label>
            </div>
            <div className="conteiner-inputs-email">
              <input
                type="password"
                name={repeatPassword}
                value={repeatPassword}
                onChange={({ target }) =>
                  handleChange(target, setRepeatPassword)
                }
                id="password"
                placeholder=" "
                className="email"
              />
              <label for="password" className="label-email">
                Repeat Password
              </label>
            </div>
            <div className="containerUser">
              <p id="error">{err}</p>
            </div>
            <button
              type="submit"
              disabled={toggleButton}
              className="button"
              onClick={() => handleClick()}
            >
              Sing Up
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Register;
