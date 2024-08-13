import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation , useNavigate} from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // const response = await axios.post('http://127.0.0.1:8000/api/login/', {
      //   username,
      //   password,
      // });

      const response = await axios.post('http://127.0.0.1:8002/api/user/login/', {
        username,
        password,
      });
  
      if (response.status === 200) {

        const { access, refresh } = response.data;
        Cookies.set('access_token', access, {expires:1});
        Cookies.set('refresh_token', refresh, { expires:7})
        navigate('/', { state: { loginSuccess: true } });
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
        if (error.response.status === 400) {
          toast.error('Bad request. Please check your input.');
        } else if (error.response.status === 401) {
          toast.error('Invalid credentials');
        } else {
          toast.error('Something went wrong');
        }
      } else if (error.request) {
        console.error('Error request:', error.request);
        toast.error('No response from server');
      } else {
        console.error('Error message:', error.message);
        toast.error('Something went wrong');
      }
    }
  };
  

 
  useEffect(() => {
    if(location.state?.registrationSuccess){
      toast.success("User registered successfully!");
    }
  },[location])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200">
           <nav className="bg-gray-900 p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-center">
          <Link to="/" className="text-white text-xl font-semibold">
            Home
          </Link>
        </div>
      </nav>
      <div className="relative max-w-lg w-full bg-gray-900 p-8 rounded-lg shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#333] to-[#1a1a1a] opacity-50"></div>
        <div className="relative z-10">
          <div className="text-center mb-6">
            {/* <img src="/path-to-your-logo.png" alt="Logo" className="mx-auto h-12" /> */}
            <h1 className="text-3xl font-bold mb-4">Log In</h1>
            <p className="text-gray-400 text-sm">Access your account and manage your content.</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                // placeholder=""
                className="w-full p-4 pl-12 border border-gray-700 rounded-md bg-gray-800 text-gray-200"
                required
              />
              <FaUser  className="absolute top-3 left-4 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-4 pl-12 border border-gray-700 rounded-md bg-gray-800 text-gray-200"
                required
              />
              <FaLock className="absolute top-3 left-4 text-gray-400" />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-md font-semibold shadow-md hover:bg-blue-600 transition"
            >
              Log In
            </button>
          </form>
          <div className="mt-4 flex justify-between items-center">
            <Link to="/forgot-password" className="text-blue-400 hover:underline text-sm">Forgot Password?</Link>
            <p className="text-gray-400 text-sm">
              Don't have an account? <Link to="/signup" className="text-blue-400 hover:underline">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
