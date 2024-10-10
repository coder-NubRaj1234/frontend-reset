// src/components/ArticleModal.jsx
import React from "react";

const ArticleModal = ({ article, onClose }) => {
  if (!article) return null; // Ensure article is not null or undefined

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-background rounded-lg shadow-lg p-6 w-full h-full max-w-3xl flex flex-col">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white">{article.title}</h2>
        </div>
        <img 
          src={article.imageURL} // Adjusted to match the blog image field
          alt={article.title} 
          className="w-full h-48 object-cover my-4 rounded" 
        />
        <div className="overflow-y-auto flex-grow max-h-[calc(100vh-200px)] text-gray-300">
          <p className="text-base mb-4">{article.content}</p>
          <p className="text-base mb-2"><strong>Category:</strong> {article.category}</p>
        </div>
        <div className="flex justify-end mt-4">
          <button 
            onClick={onClose} 
            className="bg-[#634da3] text-white px-4 py-2 rounded hover:bg-[#533b92] transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;