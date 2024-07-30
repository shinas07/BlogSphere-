import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111113] text-gray-200">
      <div className="relative max-w-lg w-full bg-gray-900 p-8 rounded-lg shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#333] to-[#1a1a1a] opacity-50"></div>
        <div className="relative z-10">
          <div className="text-center mb-6">
            {/* <img src="/path-to-your-logo.png" alt="Logo" className="mx-auto h-12" /> */}
            <h1 className="text-3xl font-bold mb-4">Log In</h1>
            <p className="text-gray-400 text-sm">Access your account and manage your content.</p>
          </div>
          <form className="space-y-6">
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="john.doe@example.com"
                className="w-full p-4 pl-12 border border-gray-700 rounded-md bg-gray-800 text-gray-200"
                required
              />
              <FaEnvelope className="absolute top-3 left-4 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="password"
                id="password"
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
    </div>
  );
};

export default Login;
