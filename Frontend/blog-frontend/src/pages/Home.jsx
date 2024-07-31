import React, {useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  const location = useLocation();
  const isLoggedIn = location.state?.loginSuccess || false;

  useEffect(() => {
    if(location.state?.loginSuccess){
      toast.success("Login successful!");
    }
  },[location])


  return (
    <div className="font-sans min-h-screen bg-[#111113] text-gray-200">
      
      <nav className="bg-[#111113] p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">MyBlog</div>
          <div>
            <a href="#home" className="text-gray-300 mx-2">Home</a>
            <Link to="/articles" className="text-gray-300 mx-2">Articles</Link>
            {!isLoggedIn && <Link to="/signup" className="text-gray-300 mx-2">Sign Up</Link>}
            {isLoggedIn && <Link to="/logout" className="text-gray-300 mx-2">Log Out</Link>}
          </div>
        </div>
      </nav>

      <header className="bg-[#111111] bg-opacity-90 text-white py-20 relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#111111] to-[#2C2C2C] opacity-70"></div>
  <div className="container mx-auto text-center relative z-10">
    <h1 className="text-5xl font-bold mb-4">Welcome to MyBlog</h1>
    <p className="text-xl mb-6">Discover the latest articles and insights.</p>
    <button className="px-6 py-3 bg-gradient-to-r from-[#FF6F61] to-[#D966D7] text-white rounded-full font-semibold shadow-lg hover:shadow-2xl hover:from-[#FF4F40] hover:to-[#D759B2] transition">
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
      <ToastContainer />
    </div>
  );
};

export default Home;
