import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111113] text-gray-200">
      <div className="relative max-w-lg w-full bg-gray-900 p-8 rounded-lg shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#333] to-[#111113] opacity-60"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-center mb-8">Create Your Account</h1>
          <form className="space-y-6">
            <div className="relative">
              <input
                type="text"
                id="name"
                placeholder="John Doe"
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
