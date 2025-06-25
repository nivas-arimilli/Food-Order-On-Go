import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });
  const nav = useNavigate();

  async function submit() {
    await axios.post('http://localhost:5000/api/users/register', form);
    nav('/login');
  }

  return (
    <div>
      <h2>Register</h2>
      {['name','email','password'].map(key => (
        <input
          key={key}
          type={key === 'password' ? 'password' : 'text'}
          placeholder={key}
          onChange={e => setForm({ ...form, [key]: e.target.value })}
        />
      ))}
      <select onChange={e => setForm({ ...form, role: e.target.value })} value={form.role}>
        <option value="customer">Customer</option>
        <option value="restaurant">Restaurant</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={submit}>Register</button>
    </div>
  );
}
