import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const JobDetails = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const navigate = useNavigate(); // Initialize navigate
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const apiUrl = import.meta.env.VITE_REACT_API_URL;

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const response = await fetch(`${apiUrl}/api/jobs/get-job/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Set token in headers
          },
          credentials: 'include', // Ensure cookies are included if your server requires this
        });

        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }

        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleUpdate = () => {
    navigate(`/dashboard/update-job/${id}`); // Navigate to the update page
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await fetch(`${apiUrl}/api/jobs/delete-job/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Set token in headers
        },
        credentials: 'include', // Ensure cookies are included if your server requires this
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      toast.success('Job Deleted successfully');
      navigate('/'); // Navigate to jobs list after deletion
    } catch (err) {
      setError('Failed to delete job');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!job) {
    return <div>No job found</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Job Details</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Field</th>
                <th className="py-2 px-4 border-b text-left">Details</th>
              </tr>
            </thead>
            <tbody>
            
              <tr>
                <td className="py-2 px-4 border-b">Title</td>
                <td className="py-2 px-4 border-b">{job.title}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Description</td>
                <td className="py-2 px-4 border-b">
                  <div dangerouslySetInnerHTML={{ __html: job.description }} />
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Created At</td>
                <td className="py-2 px-4 border-b">{new Date(job.created_at).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          {/* Only show Update and Delete buttons if authenticated */}
          {isAuthenticated && (
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleUpdate}
                className="bg-green-600 font-mono border-black border-2 text-white px-4 py-2 hover:rounded-full"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-900 text-white px-4 py-2 hover:bg-red-600 hover:rounded-full font-mono border-black border-2"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
