import './login.css';
import logo from '../../icons/eventBuddy-logo.svg';
import img from '../../images/login-register.svg';
import TextField from '../../components/common/TextField';
import Button from '../../components/common/Button';
import Typography from '../../components/common/Typography';
import { useState } from 'react';

import validator from 'validator';
import { login } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../utils/routes';

function Login() {
  const [state, setState] = useState({
    disabled: true,
    error: false,
    email: '',
    emailHelper: undefined,
    password: '',
    passwordHelper: undefined,
  });

  const navigate = useNavigate();

  const handleChange = (form) => {
    const newState = {
      ...state,
      ...form,
    };

    const validEmail = validator.isEmail(newState.email);
    const validPassword = newState.password.length >= 8;

    setState({
      ...newState,
      disabled: !validEmail || !validPassword,
      emailHelper:
        validEmail || newState.email === ''
          ? undefined
          : 'Please enter a valid email',
      passwordHelper:
        validPassword || newState.password === ''
          ? undefined
          : 'Must contain at least 8 characters',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = {
      email: state.email,
      password: state.password,
    };
    login(form, () => navigate(Routes.Home)).catch(() =>
      handleChange({ error: true }),
    );
  };

  return (
    <div className="login-container">
      <div className="login-container--left">
        <div className="login-container--left_form">
          <div className="login-container--left_brand">
            <img alt="logo" src={logo} />
            <h2>EventBuddy</h2>
          </div>
          <div className="login-container--left_inputs">
            <div className="login-container--left_inputs_title">
              <Typography variant="h5">Welcome Back!</Typography>
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
              onChange={(e) => handleChange({ password: e.target.value })}
              value={state.password}
              label="Password"
              placeholder="Password123!"
              type="password"
              error={state.passwordHelper}
              helperText={state.passwordHelper}
            />
            <div className="login-container--left_buttons">
              <Button
                disabled={state.disabled}
                onClick={handleSubmit}
                size="lg"
                text="Log In"
              />
              <Button
                variant="ghost"
                size="lg"
                text="Register"
                onClick={() => navigate(Routes.Register)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="login-container--right">
        <div className="login-container--right_img">
          <img alt="img" src={img} />
        </div>
      </div>
    </div>
  );
}

export default Login;
