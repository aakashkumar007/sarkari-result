import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill styles
import axios from 'axios'; // Import Axios
import { toast } from 'sonner'; // For notifications
import './AddJobListing.css'; // Import the CSS file

const AddJobListing = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_REACT_API_URL;

  const handleTitleChange = (e) => {
    setJobTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!jobTitle || !jobDescription) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      // Send a POST request to the backend API with Authorization header
      await axios.post(`${apiUrl}/api/jobs/post-jobs`, {
        title: jobTitle,
        description: jobDescription,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in headers
        },
      });

      // Show success message and reset the form
      toast.success('Job listing added successfully');
      setJobTitle('');
      setJobDescription('');
    } catch (error) {
      console.error('Error adding job listing:', error);
      toast.error('Error adding job listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-job-listing-container">
      <h1 className="text-2xl font-bold mb-4">Add Job Listing</h1>
      <form onSubmit={handleSubmit} className="add-job-form">
        <div className="form-group">
          <label htmlFor="jobTitle" className="form-label">Job Title</label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={handleTitleChange}
            className="form-input"
            placeholder="Enter job title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobDescription" className="form-label">Job Description</label>
          <ReactQuill
            id="jobDescription"
            value={jobDescription}
            onChange={setJobDescription}
            className="quill-editor"
            placeholder="Enter job description"
          />
        </div>
        <button type="submit" className="submit-button mt-6" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddJobListing;
