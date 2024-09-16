import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill styles
import axios from 'axios'; // Import Axios
import { toast } from 'sonner'; // For notifications
import { useParams, useNavigate } from 'react-router-dom'; // For navigation
import '../jobListing/AddJobListing.css'; // Import the CSS file

const UpdateJobListing = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_REACT_API_URL;

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const response = await axios.get(`${apiUrl}/api/jobs/get-job/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Set token in headers
          },
        });
        setJobTitle(response.data.title);
        setJobDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching job details:', error);
        toast.error('Error fetching job details');
      }
    };

    fetchJobDetails();
  }, [id]);

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
      // Send a PUT request to update the job details
      await axios.put(`${apiUrl}/api/jobs/update-job/${id}`, {
        title: jobTitle,
        description: jobDescription,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, // Set token in headers
        },
      });

      // Show success message and navigate back to the job details page
      toast.success('Job listing updated successfully');
      navigate(`/`);
    } catch (error) {
      console.error('Error updating job listing:', error);
      toast.error('Error updating job listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-job-listing-container">
      <h1 className="text-2xl font-bold mb-4">Update Job Listing</h1>
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
          {loading ? 'Submitting...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default UpdateJobListing;
