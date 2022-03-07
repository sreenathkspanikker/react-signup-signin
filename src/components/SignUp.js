import React, { useState, useEffect } from "react";
import { validateEmail } from "../utils/EmailValidator";
import usePasswordValidator from "../utils/PasswordValidator";
import {setItems} from "../utils/Storage";

function SignUp(props) {
    const [email, setEmail] = useState("");
    const [isSignup, setSignup] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

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

    useEffect(
        () => {
        if (!confirmPassword || !password) {
            setConfirmPasswordError("");
        } else {
            if (password !== confirmPassword) {
            setConfirmPasswordError("The passwords must match.");
            } else {
            setConfirmPasswordError("");
            }
        }
        },
        [password, confirmPassword]
    );

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email !== '' && password !== '') {
            setItems(email, password)
            setSignup(true)
            setTimeout(() => {
                setSignup(false)
                props.signUp(true)
            }, 3000);
        }
    }

    return (
        <div className="app-signin">
            <div className="app-content">   
                {!isSignup ? (    
                    <form onSubmit={handleSubmit}>
                    <h3>Please sign up</h3>
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

                    <input
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        type="password"
                        placeholder="Confirm Password"
                    />
                    <div className="error">{confirmPasswordError}</div>

                    <button type="submit">Submit</button>
                    </form>
                ) : 
                (
                    <div className="wrapper"> 
                        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                        </svg>
                        <h3>Signup success</h3>
                        <p>Please Login</p>
                    </div>
                )} 
            </div>
        </div>
    );
}

export default SignUp;
