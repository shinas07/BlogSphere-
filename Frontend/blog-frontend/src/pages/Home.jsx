import React from 'react';
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="font-sans min-h-screen bg-[#111113] text-gray-200">
      <nav className="bg-[#111113] p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">MyBlog</div>
          <div>
            <a href="#home" className="text-gray-300 mx-2">Home</a>
            <Link to="/articles" className="text-gray-300 mx-2">Articles</Link>
            <Link to="/signup" className="text-gray-300 mx-2">Sign Up</Link>
          </div>
        </div>
      </nav>
      <header className="bg-[#111113] text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold">Welcome to MyBlog</h1>
          <p className="mt-4 text-xl">Discover the latest articles and insights.</p>
          <button className="mt-6 px-4 py-2 bg-gray-300 text-[#111113] rounded-full font-bold shadow-lg">
            Get Started
          </button>
        </div>
      </header>
      <section id="articles" className="py-20 bg-[#111113]">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-white">Article One</h3>
              <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-white">Article Two</h3>
              <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-white">Article Three</h3>
              <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.</p>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-[#111113] text-gray-200 py-10">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold">Contact Us</h3>
          <p className="mt-4">Email: contact@myblog.com</p>
          <p className="mt-2">Phone: (123) 456-7890</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
