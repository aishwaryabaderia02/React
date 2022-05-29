import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import AuthContext from '../../store/auth-context';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }

}

const passwordReducer = (state, action) => {
  if (action.type === 'USER_PASS') {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }
  if (action.type === 'PASS_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: '', isValid: false }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null })

  const { isValid: isEmailValid } = emailState
  const { isValid: isPasswordValid } = passwordState

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        isEmailValid && isPasswordValid
      );
    }, 500)
    return () => { clearTimeout(identifier) };
  }, [isEmailValid, isPasswordValid])

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value })

    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: 'USER_PASS', val: event.target.value })

    setFormIsValid(
      passwordState.isValid && emailState.isValid
    );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: 'INPUT_BLUR' })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'PASS_BLUR' })
    // setPasswordIsValid(passwordState.isValid);
  };

  const authCtx = useContext(AuthContext)
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value)
    }
    else if (!isEmailValid) {
      emailInputRef.current.focus()
    } else if (!isPasswordValid) {
      passwordInputRef.current.focus()
    }
  };


  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          type="email"
          label="E-mail"
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          isValid={isEmailValid}
          value={emailState.value}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          type="password"
          label="Password"
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          isValid={isPasswordValid}
          value={passwordState.value}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
