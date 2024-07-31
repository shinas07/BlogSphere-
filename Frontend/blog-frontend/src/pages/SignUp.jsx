import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != confirmPassword){
      setMessage('Password do not match');
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/',{
        username,
        email,
        password,
      });
      console.log(response.data);
      // setMessage('Registration successful')
      toast.success('Registration successful!');
      navigate('/login', { state: { registrationSuccess: true } });
    }catch(error){
      console.error('Error registering user:', error)
      setMessage('Error registering user')
    }

    }

  return (
    // <div className="min-h-screen flex items-center justify-center bg-[#111113] text-gray-200">
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200">

       <nav className="bg-gray-900 p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-center">
          <Link to="/" className="text-white text-xl font-semibold">
            Home
          </Link>
        </div>
      </nav>
      <div className="relative max-w-lg w-full bg-gray-900 p-8 rounded-lg shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#333] to-[#111113] opacity-60"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-center mb-8">Create Your Account</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 pl-12 border border-gray-700 rounded-md bg-gray-800 text-gray-200"
                required
              />
              <FaUser className="absolute top-4 left-4 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 pl-12 border border-gray-700 rounded-md bg-gray-800 text-gray-200"
                required
              />
              <FaEnvelope className="absolute top-4 left-4 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 pl-12 border border-gray-700 rounded-md bg-gray-800 text-gray-200"
                required
              />
              <FaLock className="absolute top-4 left-4 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="password"
                id="confirm-password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-4 pl-12 border border-gray-700 rounded-md bg-gray-800 text-gray-200"
                required
              />
              <FaLock className="absolute top-4 left-4 text-gray-400" />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-md font-semibold shadow-lg hover:bg-blue-600 transition"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center text-gray-400">
            Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
