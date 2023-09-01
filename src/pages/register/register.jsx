import './register.css';
import logo from '../../icons/eventBuddy-logo.svg';
import img from '../../images/login-register.svg';
import TextField from '../../components/common/TextField';
import Button from '../../components/common/Button';
import Typography from '../../components/common/Typography';
import { useState } from 'react';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import { register } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../utils/routes';

function Register() {
  const [state, setState] = useState({
    disabled: true,
    error: false,
    username: '',
    email: '',
    emailHelper: undefined,
    password: '',
    passwordHelper: undefined,
    repeatPassword: '',
    repeatPasswordHelper: undefined,
  });

  const navigate = useNavigate();

  const handleChange = (form) => {
    const newState = {
      ...state,
      ...form,
    };

    const validEmail = validator.isEmail(newState.email);
    const validPassword = newState.password.length >= 8;
    const passwordsMatch = newState.password === newState.repeatPassword;

    setState({
      ...newState,
      disabled: !validEmail || !validPassword || !passwordsMatch,
      emailHelper:
        validEmail || newState.email === ''
          ? undefined
          : 'Please enter a valid email',
      passwordHelper:
        validPassword || newState.password === ''
          ? undefined
          : 'Must contain at least 8 characters',
      repeatPasswordHelper:
        passwordsMatch || newState.repeatPassword === ''
          ? undefined
          : "Passwords don't match",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = {
      email: state.email,
      password: state.password,
      username: state.username,
    };
    register(form, () => navigate(Routes.Home)).
    catch(() =>{
        toast.error("Username or email already exists")
        }
    );
  };

  return (
    <div className="register-container">
      <div className="register-container--left">
        <div className="register-container--left_form">
          <div className="register-container--left_brand">
            <img alt="logo" src={logo} />
            <h2>EventBuddy</h2>
          </div>
          <div className="register-container--left_inputs">
            <div className="register-container--left_inputs_title">
              <Typography variant="h5">Create your account</Typography>
            </div>
            <TextField
              onChange={(e) => handleChange({ email: e.target.value })}
              value={state.email}
              label="Email"
              placeholder="jane.doe@mail.com"
              error={state.emailHelper}
              helperText={state.emailHelper}
            />
            <TextField
              onChange={(e) => handleChange({ username: e.target.value })}
              value={state.username}
              label="Username"
              placeholder="jane.doe"
            />
            <TextField
              onChange={(e) => handleChange({ password: e.target.value })}
              value={state.password}
              label="Password"
              placeholder="Password123!"
              type="password"
              error={state.passwordHelper}
              helperText={state.passwordHelper}
            />
            <TextField
              onChange={(e) => handleChange({ repeatPassword: e.target.value })}
              value={state.repeatPassword}
              label="Repeat Password"
              placeholder="Password123!"
              type="password"
              error={state.repeatPasswordHelper}
              helperText={state.repeatPasswordHelper}
            />
            <div className="register-container--left_buttons">
              <Button
                disabled={state.disabled}
                onClick={handleSubmit}
                size="lg"
                text="Register"
              />
              <Button onClick={() => navigate(Routes.Login)} variant="ghost" size="lg" text="I have an account" />
            </div>
              <ToastContainer
                  position="top-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  theme="light"
              />
          </div>
        </div>
      </div>
      <div className="register-container--right">
        <div className="register-container--right_img">
          <img alt="img" src={img} />
        </div>
      </div>
    </div>
  );
}

export default Register;
