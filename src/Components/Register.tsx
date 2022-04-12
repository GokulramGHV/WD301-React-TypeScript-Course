import { navigate } from 'raviger';
import React, { useState } from 'react';
import { register } from '../utils/apiUtils';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // eslint-disable-next-line
      const data = await register(username, email, password1, password2);
      // localStorage.setItem('token', data.token);
      // window.location.reload();
      alert("Registration Success!")
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full divide-y divide-gray-300">
        <h1 className="text-2xl m-2.5 font-semibold">Register</h1>
        <form className="py-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username">Username</label>
            <input
              className="flex-1 border-2 w-full border-gray-300 rounded-lg p-2 mt-1 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              className="flex-1 border-2 w-full border-gray-300 rounded-lg p-2 mt-1 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password1">Password</label>
            <input
              className="flex-1 border-2 w-full border-gray-300 rounded-lg p-2 mt-1 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
              type="password"
              name="password1"
              id="password1"
              value={password1}
              onChange={(e) => {
                setPassword1(e.target.value);
              }}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password2">Confirm Password</label>
            <input
              className="flex-1 border-2 w-full border-gray-300 rounded-lg p-2 mt-1 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
              type="password"
              name="password2"
              id="password2"
              value={password2}
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
              required
            />
          </div>

          <button
            className="mt-3 w-full bg-blue-500 font-medium font-worksans rounded-lg px-4 py-2 text-white hover:bg-blue-700 smooth-effect"
            type="submit"
          >
            Sign-Up
          </button>
        </form>
      </div>
    </>
  );
}
