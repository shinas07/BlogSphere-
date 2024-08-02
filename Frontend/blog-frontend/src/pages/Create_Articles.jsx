import axios from 'axios';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link  } from 'react-router-dom';
import Cookies from 'js-cookie'
const WriteArticlePage = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    console.log('datas adding correctly')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title)
    formData.append('content', content)
    if (image) formData.append('image', image)

    const accessToken = Cookies.get('access_token')
    console.log(accessToken)

      try {
        const response = await axios.post('http://127.0.0.1:8001/api/create/', formData, {  
          headers: {
            'Content-Type': 'multipart/form-data',  // Set content type
            'Authorization': `Bearer ${accessToken}`, 
          },
        });
        if (response.status === 201){
          toast.success('Article submitted successfully')
          setContent('')
          setImage(null)
          setTitle('')
          setPreview('')
        }else{
          toast.error(`Error: ${response.data.message || 'Something went wrong'}`);
        }
    } catch(error){
      toast.error('Network error. Pleace try again later.')
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-900 flex flex-col">
      <nav className="bg-gray-900 p-4 shadow-md">
        <div className="container mx-auto flex justify-center space-x-6">
          <a href="/" className="text-gray-300 font-semibold  mx-2 hover:underline">Home</a>
          {/* <a href="/logout" className="text-gray-300 font-semibold hover:underline">Logout</a> */}
          <Link to="/logout" className="text-gray-300 mx-2">Log Out</Link>
        </div>
      </nav>
      <div className="flex-grow flex items-center justify-center py-10">
        <div className="w-full max-w-2xl bg-gray-900 p-8 rounded-lg shadow-2xl shadow-gray-800">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Write a New Article</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-lg font-semibold text-gray-300 mb-2">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 border border-gray-700 rounded-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-lg font-semibold text-gray-300 mb-2">Upload Image</label>
              <div className="relative w-full border border-gray-700 bg-gray-800 p-4 rounded-md cursor-pointer hover:bg-gray-700 transition duration-300">
                <input
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required
                />
                <div className="text-center text-gray-400">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-md" />
                  ) : (
                    <p className="text-lg">Drag & drop an image here, or click to select</p>
                  )}
                </div>
              </div>
            </div>
            <div>
          <label htmlFor="content" className="block text-lg font-semibold text-gray-300 mb-2">Content</label>
          <div className="relative border border-gray-700 rounded-md bg-gray-800 overflow-hidden">
            <ReactQuill
              id="content"
              value={content}
              onChange={setContent}
              className="h-80 bg-gray-900 text-gray-200"
              theme="snow"
            />
          </div>
        </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg font-bold shadow-lg shadow-gray-800 hover:from-gray-700 hover:to-gray-600 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Submit Article
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default WriteArticlePage;