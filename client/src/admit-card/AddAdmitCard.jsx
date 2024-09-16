import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import axios from 'axios';
import { toast } from 'sonner'; // For notifications
import { useNavigate } from 'react-router-dom';

const AddAdmitCardPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_REACT_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!title || !description) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      // Send a POST request to the backend API with Authorization header
      await axios.post(`${apiUrl}/api/admit-card/post-admit-cards`, {
        title,
        description,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in headers
        },
      });

      // Show success message and reset the form
      toast.success('Admit card added successfully');
      setTitle('');
      setDescription('');
      navigate('/get-all-admit-cards');
    } catch (error) {
      toast.error('Error adding admit card');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 md:px-10 lg:px-20 py-5 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Admit Card</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2 font-semibold">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter admit card title"
            disabled={loading} // Disable input while loading
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-2 font-semibold">Description</label>
          <ReactQuill
            id="description"
            value={description}
            onChange={setDescription}
            className="h-96 border border-gray-300 rounded-lg"
            placeholder="Enter admit card description"
            readOnly={loading} // Make Quill editor read-only while loading
          />
        </div>
        {loading && <div className="text-blue-500 mt-2">Submitting...</div>}
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

export default AddAdmitCardPage;
