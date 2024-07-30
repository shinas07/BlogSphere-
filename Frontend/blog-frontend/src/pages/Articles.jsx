import React, { useState, useEffect } from 'react';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  useEffect(() => {
    // Fetch articles and categories (replace with your API endpoints)
    async function fetchData() {
      const articlesResponse = await fetch('/api/articles');
      const categoriesResponse = await fetch('/api/categories');
      const articlesData = await articlesResponse.json();
      const categoriesData = await categoriesResponse.json();
      setArticles(articlesData);
      setCategories(categoriesData);
    }
    fetchData();
  }, []);

  const filteredArticles = articles
    .filter(article => selectedCategory === 'All' || article.category === selectedCategory)
    .filter(article => article.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="font-sans min-h-screen bg-[#111113] text-gray-200">
      <nav className="bg-[#111113] p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">MyBlog</div>
          <div>
            <a href="/" className="text-gray-300 mx-2">Home</a>
            <a href="#articles" className="text-gray-300 mx-2">Articles</a>
            <a href="#signup" className="text-gray-300 mx-2">Sign Up</a>
          </div>
        </div>
      </nav>
      <header className="bg-[#111113] text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold">Articles</h1>
          <p className="mt-4 text-xl">Explore our latest articles and insights.</p>
        </div>
      </header>
      <section id="filter" className="py-10 bg-[#111113]">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full p-3 bg-gray-900 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 bg-gray-900 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="All">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>
      <section id="articles-list" className="py-20 bg-[#111113]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentArticles.map((article) => (
              <div key={article.id} className="p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition ease-in-out duration-300">
                <h3 className="text-2xl font-bold mb-4 text-white">{article.title}</h3>
                <p className="text-gray-400 mb-4">{article.summary}</p>
                <a href={`/articles/${article.id}`} className="text-blue-400 hover:underline">Read More</a>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <nav>
              <ul className="flex space-x-2">
                {[...Array(Math.ceil(filteredArticles.length / articlesPerPage)).keys()].map((number) => (
                  <li key={number}>
                    <button
                      onClick={() => paginate(number + 1)}
                      className={`px-4 py-2 rounded-full ${currentPage === number + 1 ? 'bg-gray-300 text-[#111113]' : 'bg-gray-600 text-gray-200'} hover:bg-gray-500`}
                    >
                      {number + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Articles;
