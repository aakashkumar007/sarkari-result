import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill styles
import axios from 'axios'; // Import Axios
import { toast } from 'sonner'; // For notifications
import { useParams, useNavigate } from 'react-router-dom'; // For navigation

const UpdateResult = () => {
  const { id } = useParams(); // Get the result ID from the URL
  const navigate = useNavigate();
  const [resultTitle, setResultTitle] = useState('');
  const [resultDescription, setResultDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_REACT_API_URL;

  useEffect(() => {
    const fetchResultDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const response = await axios.get(`${apiUrl}/api/result/get-result/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Set token in headers
          },
        });
        setResultTitle(response.data.title);
        setResultDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching result details:', error);
        toast.error('Error fetching result details');
      }
    };

    fetchResultDetails();
  }, [id]);

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
      // Send a PUT request to update the result details
      await axios.put(`${apiUrl}/api/result/update-result/${id}`, {
        title: resultTitle,
        description: resultDescription,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, // Set token in headers
        },
      });

      // Show success message and navigate back to the result details page
      toast.success('Result updated successfully');
      navigate(`/result/${id}`); // Redirect to the result details page
    } catch (error) {
      console.error('Error updating result:', error);
      toast.error('Error updating result');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-result-container">
      <h1 className="text-2xl font-bold mb-4">Update Result</h1>
      <form onSubmit={handleSubmit} className="update-result-form">
        <div className="form-group">
          <label htmlFor="resultTitle" className="form-label">Result Title</label>
          <input
            type="text"
            id="resultTitle"
            value={resultTitle}
            onChange={handleTitleChange}
            className="form-input"
            placeholder="Enter result title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="resultDescription" className="form-label">Result Description</label>
          <ReactQuill
            id="resultDescription"
            value={resultDescription}
            onChange={setResultDescription}
            className="quill-editor"
            placeholder="Enter result description"
          />
        </div>
        <button type="submit" className="submit-button mt-6" disabled={loading}>
          {loading ? 'Submitting...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default UpdateResult;
