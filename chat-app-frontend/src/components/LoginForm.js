import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';

function LoginForm() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    
  const handleLogin = async (event) => {
    event.preventDefault();

    // Here you would typically call a function to authenticate the user,
    // for example, by sending a request to a server. For simplicity, we'll just log the username and password.
    console.log(`Logging in with username: ${username} and password: ${password}`);

    const url = "http://localhost:3000/auth/login";
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json", "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    };
    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data);
    if (data.userId) {
        navigate('/chat');
    } else {
        alert(data.message);
    }
  };

  const handleInputChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };
  return (
    <div className="login-form">
        <form onSubmit={handleLogin}>
            <h1>LOGIN</h1>
                <div className="content">
                    <div className="input-field">
                        <label htmlFor="email">Username</label>
                        <div className="sec-2">
                            <input type="email" name="username" className="email" placeholder="Email" onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <div className="sec-2">
                            <input type="password" name="password" className="password" placeholder="Password" onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="action">
                        <button type="button">Register</button>
                        <button type="submit">Login</button>
                    </div>
                </div>
        </form>
    </div>
  );
}
export default LoginForm;