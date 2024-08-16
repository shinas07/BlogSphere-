import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios  from 'axios';
import { Button } from '../ui/AnimatedButton';
import { Tube } from '@react-three/drei';

const Home = () => {
  // const location = useLocation();
  // const [loggedIn, setloggedIn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [articles, setArticles] = useState(([]))
  // const status = location.state?.status;
  const { state } = useLocation();
  const [showLoginToast, setShowLoginToast] = useState(state?.status || false);


  // useEffect(() => {

  //   if(localStorage.getItem('isLoggedIn') === 'true'){
  //     setloggedIn(true)
  //     console.log('it working')
  //   }
  //   // console.log(loggedIn , '1');
  //   // console.log(loggedIn,'2');
  //   if(showLoginToast){
  //     toast.success("Login successful!");
  //     setShowLoginToast(false)
  //   }

  // },[showLoginToast]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setLoggedIn(isLoggedIn);

    if (showLoginToast) {
      toast.success("Login successful!");
      setShowLoginToast(false);
    }
  }, [showLoginToast]);


 
  const fetchArticles  = async () => {
    try{
      const responce = await axios.get('http://127.0.0.1:8001/api/articles/');
      setArticles(responce.data);

    }catch(error){
      toast.error('Error fetching articles:',error)
    }
  };

  useEffect(() => {
    fetchArticles();
  },[]);



  return (
    <div className="overflow-hidden font-sans min-h-screen bg-[#111113] text-gray-200">
      <nav className="bg-[#111113] p-4 shadow-lg">
        <div className="container mx-auto flex justify-between space-x-6">
          {/* <div className="text-white text-2xl font-bold">Blog Sphere</div> */}
          <div className="text-white text-2xl font-bold">Błǿģ Şρħεяę</div>

          <div>
            <a href="#home" className="text-gray-300 mx-2">Home</a>
            <Link to="/articles" className="text-gray-300 mx-2">Articles</Link>
            {!loggedIn && <Link to="/signup" className="text-gray-300 mx-2">Sign Up</Link>}
            {loggedIn && <Link to="/logout" className="text-gray-300 mx-2">Log Out</Link>}
          </div>
        </div>
      </nav>

      <header className="bg-[#111111] bg-opacity-90 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#111111] to-[#2C2C2C] opacity-70"></div>
        <div className="container mx-auto text-center relative z-10">



<h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#f0f0f0] via-[#ffffff] to-[#d9d9d9] font-serif">
    Welcome to BlogSphere
</h1>






          <p className="text-xl mb-6">Discover the latest articles and insights.</p>
          
          {/* <Link to={'/articles'}>
          <button className="px-6 py-3 bg-gradient-to-r from-[#FF6F61] to-[#D966D7] text-white rounded-full font-semibold shadow-lg hover:shadow-2xl hover:from-[#FF4F40] hover:to-[#D759B2] transition">
            Get Started
          </button>
          </Link> */}
          <Link to={'/articles'}>
          <Button
          borderRadius='1.75rem'
        className="px-6 py-3 text-white font-semibold shadow-md hover:shadow-lg"
        containerClassName="h-14 bg-[linear-gradient(90deg,rgba(2,0,36,1)_0%,rgba(26,26,134,1)_50%,rgba(144,35,171,1)_100%)]"
      >
        Create Article
      </Button>
            </Link>
        </div>
      </header>

      <section id="articles" className="py-20 bg-[#111113]">
      <div className="container mx-auto text-center">
    
      <h2 className="text-4xl font-bold mb-8 text-white" style={{ fontFamily: 'Georgia, serif' }}>
    Featured Articles
</h2>


        <div className="relative inline-block">
  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
             <Link to={`/article/${article.id}`} key={article.id}className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-9 text-white">{article.title}</h3>

              <p className="text-gray-400">{article.content.substring(0,80)}...</p>
              <p className="text-gray-500 text-sm mt-4">By: {article.author_username}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
      <ToastContainer />
    </div>
  );
};

export default Home;
