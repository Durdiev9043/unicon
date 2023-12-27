import React, { useState } from 'react';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  console.log(phone);
  console.log(password);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://unic2.pythonanywhere.com/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phone,
          password: password,
        }),
      });

      const data = await response.json();
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("tovar", JSON.stringify(data));
        window.location.href = "/home";
        console.log(data)
    } catch (error) {
      console.error('Xatolik:', error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label htmlFor="phone">Phone:</label>
      <input
        type="text"
        id="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;