import { navigate } from 'raviger';
import React, { useEffect, useState } from 'react';
// import Header from '../Header';
import { login } from '../utils/apiUtils';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await login(username, password);
      localStorage.setItem('token', data.token);
      window.location.reload();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <div className="w-full divide-y divide-gray-300">
        <h1 className="text-2xl m-2.5 font-semibold">Login</h1>
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
            <label htmlFor="password">Password</label>
            <input
              className="flex-1 border-2 w-full border-gray-300 rounded-lg p-2 mt-1 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>

          <button
            className="mt-3 w-full bg-blue-500 font-medium font-worksans rounded-lg px-4 py-2 text-white hover:bg-blue-700 smooth-effect"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
