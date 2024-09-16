import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill styles
import axios from 'axios'; // Import Axios
import { toast } from 'sonner'; // For notifications
import { useParams, useNavigate } from 'react-router-dom'; // For navigation

const UpdateAdmitCardPage = () => {
  const { id } = useParams(); // Get the admit card ID from the URL
  const navigate = useNavigate();
  const [admitCardTitle, setAdmitCardTitle] = useState('');
  const [admitCardDescription, setAdmitCardDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_REACT_API_URL; // Get API URL from env variables

  // Fetch admit card details
  useEffect(() => {
    const fetchAdmitCardDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const response = await axios.get(`${apiUrl}/api/admit-card/get-admit-card/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Set token in headers
          },
        });
        setAdmitCardTitle(response.data.title);
        setAdmitCardDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching admit card details:', error);
        toast.error('Error fetching admit card details');
      }
    };

    fetchAdmitCardDetails();
  }, [id]);

  // Handle title change
  const handleTitleChange = (e) => {
    setAdmitCardTitle(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!admitCardTitle || !admitCardDescription) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      // Send a PUT request to update the admit card details
      await axios.put(`${apiUrl}/api/admit-card/update-admit-card/${id}`, {
        title: admitCardTitle,
        description: admitCardDescription,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, // Set token in headers
        },
      });

      // Show success message and navigate back to the admit card details page
      toast.success('Admit card updated successfully');
      navigate(`/admit-card/${id}`); // Redirect to the admit card details page
    } catch (error) {
      console.error('Error updating admit card:', error);
      toast.error('Error updating admit card');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-admit-card-container">
      <h1 className="text-2xl font-bold mb-4">Update Admit Card</h1>
      <form onSubmit={handleSubmit} className="update-admit-card-form">
        <div className="form-group">
          <label htmlFor="admitCardTitle" className="form-label">Admit Card Title</label>
          <input
            type="text"
            id="admitCardTitle"
            value={admitCardTitle}
            onChange={handleTitleChange}
            className="form-input"
            placeholder="Enter admit card title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="admitCardDescription" className="form-label">Admit Card Description</label>
          <ReactQuill
            id="admitCardDescription"
            value={admitCardDescription}
            onChange={setAdmitCardDescription}
            className="quill-editor"
            placeholder="Enter admit card description"
          />
        </div>
        <button type="submit" className="submit-button mt-6" disabled={loading}>
          {loading ? 'Submitting...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default UpdateAdmitCardPage;
