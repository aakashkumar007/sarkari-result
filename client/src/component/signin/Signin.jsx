import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/authSlice';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const apiUrl = import.meta.env.VITE_REACT_API_URL;

  // Prefill email and password if stored in localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (storedEmail) setEmail(storedEmail);
    if (storedPassword) setPassword(storedPassword);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request with credentials
      const response = await axios.post(
        `${apiUrl}/api/users/login`,
        { email, password },
        { withCredentials: true } // Allows cookies to be sent with the request if needed
      );

     

      // Extract token and user data from the response
      const { token, user } = response.data;

      // Check if token exists and store it in localStorage
      if (token) {
        localStorage.setItem('token', token); // Save token in localStorage

        // Optionally store email and password for future login prefilling
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);

        // Dispatch user data to Redux store
        
        dispatch(setUser(user));

        setSuccess('Login successful');
        setError('');
        toast.success('Login Success');
        navigate('/dashboard');
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      setError('Invalid email or password');
      setSuccess('');
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-800 text-white py-2 px-4 hover:rounded-full hover:opacity-85 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
