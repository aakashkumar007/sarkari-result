import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill styles
import axios from 'axios'; // Import Axios
import { toast } from 'sonner'; // For notifications

const AddResult = () => {
  const [resultTitle, setResultTitle] = useState('');
  const [resultDescription, setResultDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_REACT_API_URL;

  const handleTitleChange = (e) => {
    setResultTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!resultTitle || !resultDescription) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      // Send a POST request to the backend API with Authorization header
      await axios.post(`${apiUrl}/api/result/post-results`, {
        title: resultTitle,
        description: resultDescription,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in headers
        },
      });

      // Show success message and reset the form
      toast.success('Result added successfully');
      setResultTitle('');
      setResultDescription('');
    } catch (error) {
      toast.error('Error adding result');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 md:px-10 lg:px-20 py-5 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Result</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label htmlFor="resultTitle" className="mb-2 font-semibold">Result Title</label>
          <input
            type="text"
            id="resultTitle"
            value={resultTitle}
            onChange={handleTitleChange}
            className="px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter result title"
            disabled={loading} // Disable input while loading
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="resultDescription" className="mb-2 font-semibold">Result Description</label>
          <ReactQuill
            id="resultDescription"
            value={resultDescription}
            onChange={setResultDescription}
            className="h-96 border border-gray-300 rounded-lg"
            placeholder="Enter result description"
            readOnly={loading} // Make Quill editor read-only while loading
          />
        </div>
        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-slate-900 text-white rounded hover:opacity-85 hover:rounded-full transition duration-300"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddResult;
