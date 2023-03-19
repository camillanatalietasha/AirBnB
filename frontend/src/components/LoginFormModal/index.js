import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory, Link } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [disableButton, setDisableButton] = useState();
  const [submitted, setSubbmited] = useState(false)
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
    setSubbmited(true)
    // if(errors.length) {
    //   return null;
    // }
    return dispatch(sessionActions.thunkLoginUser({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors({credential: "The provided credentials were invalid."});
        }
      });
  };

  const demoUser = () => {
    return dispatch(sessionActions.thunkLoginUser( {credential: "Demo-lition", password: "pass1234"}))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
        }
      );
  }

  console.log(errors)

  return (
    <>
      <h1>Log In</h1>

      {(disableButton === true && errors.length) ? <p className="errors">{errors.length}</p> : (<></>)}
      {errors.credential ? <p className="errors">{errors.credential}</p> : (<></>)}
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
        className="standard-button" 
        type="submit"
        disabled={disableButton}
        >
          Log In
        </button>
        <Link onClick={demoUser} className="demo-login-link">Demo User</Link>
      </form>
    </>
  );
}

export default LoginFormModal;
