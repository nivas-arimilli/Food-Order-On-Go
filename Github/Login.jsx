import React, { useState, useContext } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const nav = useNavigate();

  async function submit() {
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
      setUser(data);
      nav('/');
    } catch {
      alert('Invalid credentials');
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={submit}>Login</button>
    </div>
  );
}
