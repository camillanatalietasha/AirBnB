import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory, Link } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [disableButton, setDisableButton] = useState();

  const { closeModal } = useModal();

  useEffect(() => {
    if(credential.length <= 3 || password.length <= 5) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  },[password, credential])

  const handleSubmit = (e) => {
    e.preventDefault();

    return dispatch(sessionActions.thunkLoginUser({ credential, password }))
      .then(closeModal)
      .then(history.push('/'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors({credential: "The provided credentials were invalid."});
        }
      });
  };

  const demoUserLogin = async (e) => {
    e.preventDefault();
    return dispatch(sessionActions.thunkLoginUser( {credential: "demo@demo.com", password: "pass1234"}))
      .then(closeModal)
      .then(history.push('/'))
      .catch(async (res) => {
        const data = await res.json()
        console.log(data)
      })

  }

  return (
    <>
      <h1>Log In</h1>
      {(disableButton === true && errors.length) ? <p className="errors">{errors.length}</p> : (<></>)}
      {errors.credential ? <p className="errors">{errors.credential}</p> : (<></>)}
      <div className="form-content">
      <form className="session-form" onSubmit={handleSubmit}>
        <ul>
          {}
        </ul>
        <label className="session-label">
          Username or Email
          <input
          className="session-input"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className="session-label">
          Password
          <input
            className="session-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button 
        id="b"
        class={disableButton === true ? "disabled" : "not-disabled"}
        className="standard-button" 
        type="submit"
        disabled={disableButton}
        >
          Log In
        </button>
        <Link onClick={demoUserLogin} id="demo-login-link" className="link">Demo User</Link>
      </form>
      </div>
    </>
  );
}

export default LoginFormModal;
