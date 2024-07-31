import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WriteArticlePage = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center py-10">
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
            <ReactQuill
              id="content"
              value={content}
              onChange={setContent}
              className="border border-gray-700 rounded-md bg-gray-800 text-gray-200 h-80"  // Increased height
              theme="snow"
            />
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
  );
};

export default WriteArticlePage;
