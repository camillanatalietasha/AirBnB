import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = {};
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.thunkSignup({
          email,
          username,
          firstName,
          lastName,
          password,
        }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          setErrors(data.errors);
        });
    }
    // return setErrors([
    //   "Confirm Password field must be the same as the Password field",
    // ]);
    validationError.confirmPassword = "Confirm Password field must match the Password field";
    return setErrors(errors.confirmPassword);
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <ul className="form-error">
          {errors.email && (
            <li key={errors.email}>{errors.email}</li>
          )}
        </ul>
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        <ul className="form-error">
          {errors.username && (
            <li key={errors.username}>{errors.username}</li>
          )}
        </ul>
        </label>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <ul className="form-error">
          {errors.firstName && (
            <li key={errors.firstName}>{errors.firstName}</li>
          )}
        </ul>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        <ul className="form-error">
          {errors.lastName && (
            <li key={errors.lastName}>{errors.lastName}</li>
          )}
        </ul>
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <ul className="form-error">
          {errors.password && (
            <li key={errors.password}>{errors.password}</li>
          )}
        </ul>
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        <ul className="form-error">
          {errors.confirmPassword && (
            <li key={errors.confirmPassword}>{errors.confirmPassword}</li>
          )}
        </ul>
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
