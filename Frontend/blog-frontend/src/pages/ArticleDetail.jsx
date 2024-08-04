import { useParams , Link} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const ArticleDetail = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8001/api/article/details/${id}`);
        const articleData = response.data;
        articleData.image = `http://127.0.0.1:8001${articleData.image}`;
        setArticle(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [id]);


//   console.log(article.image)

  if (!article) return <div>Loading...</div>;

  return (
<div className="min-h-screen flex flex-col bg-black">
  <nav className="bg-gray-900 p-4 shadow-md">
    <div className="container mx-auto flex justify-center space-x-6">
      <a href="/" className="text-gray-300 font-semibold mx-2 hover:underline">Home</a>
      {/* <Link to="/logout" className="text-gray-300 mx-2">Log Out</Link> */}
    </div>
  </nav>
  <div className="flex flex-grow items-center justify-center">
    <div className="container mx-auto py-20 px-4 lg:px-16 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg backdrop-blur-md">
    <h1 className="text-6xl font-extrabold mb-12 text-center
    text-white bg-black p-5 rounded-lg shadow-2xl border border-gray-700
    bg-clip-text text-transparent bg-gradient-to-br from-white to-white">
    {article.title}
</h1>








      <div className="flex justify-center mb-8">
  <img src={article.image} alt={article.title} style={{ width: '640px', height: '410px' }} className="object-cover rounded-lg shadow-md" />
</div>

      <div className="px-4 lg:px-16">
        <p className="text-gray-300 mb-8 text-lg leading-relaxed">{article.content}</p>
        <p className="text-gray-500 text-sm text-right">By: {article.author_username}</p>
      </div>
    </div>
  </div>
</div>

  

  );
};

export default ArticleDetail;





