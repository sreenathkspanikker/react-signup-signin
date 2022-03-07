import React, { useState, useEffect } from "react";
import { validateEmail } from "../utils/EmailValidator";
import usePasswordValidator from "../utils/PasswordValidator";
import {getItem, removeItems} from "../utils/Storage";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLogin, setLogin] = useState(false);
  const [credential, setCredential] = useState(false);

  const [password, setPassword, passwordError] = usePasswordValidator({
    min: 8,
    max: 15
  });

  useEffect(
    () => {
      if (!email) {
        setEmailError("");
      } else {
        if (validateEmail(email)) {
          setEmailError("");
        } else {
          setEmailError("Please enter a valid email.");
        }
      }
    },
    [email]
  );

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(getItem('email'));
    if (email === getItem('email') && password === getItem('password')) {
      setLogin(true)
      setTimeout(() => {
        setLogin(false)
        removeItems('email')
        removeItems('password')
        props.signUp(false)
      }, 3000);
    } else setCredential(true)

  }

  return (
    <div className="app-signin">
      <div className={`app-content ${isLogin ? 'success' : ''}`}>    
        {!isLogin ?    
          <form onSubmit={handleSubmit}>
            <h3>Please sign in</h3>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />
            <div className="error">{emailError}</div>

            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <div className="error">{passwordError}</div>
            <button type="submit">Submit</button>
            {credential && <div className="error">Password or username incorrect</div>}
          </form>
          : (
            <div className="wrapper"> 
              <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
              <h3>Login success</h3>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default SignIn;
