import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ResultDetails = () => {
  const { id } = useParams(); // Get the result ID from the URL
  const navigate = useNavigate(); // Initialize navigate
  const [result, setResult] = useState(null);
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
    const fetchResultDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const response = await fetch(`${apiUrl}/api/result/get-result/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch result details');
        }

        const data = await response.json();
        setResult(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResultDetails();
  }, [id]);

  const handleUpdate = () => {
    navigate(`/dashboard/update-result/${id}`); // Navigate to the update page
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await fetch(`${apiUrl}/api/result/delete-result/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Set token in headers
        },
        credentials: 'include', // Ensure cookies are included if your server requires this
      });

      if (!response.ok) {
        throw new Error('Failed to delete result');
      }

      toast.success(`Result with ${result.title} Deleted successfully`);
      navigate('/get-all-results'); // Navigate to results list after deletion
    } catch (err) {
      setError('Failed to delete result');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!result) {
    return <div>No result found</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Result Details</h1>
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
                <td className="py-2 px-4 border-b">{result.title}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Description</td>
                <td className="py-2 px-4 border-b">
                  <div dangerouslySetInnerHTML={{ __html: result.description }} />
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Created At</td>
                <td className="py-2 px-4 border-b">{new Date(result.created_at).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          {/* Only show Update and Delete buttons if authenticated */}
          {isAuthenticated && (
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded-md border-2 border-black hover:bg-green-700"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md border-2 border-black hover:bg-red-700"
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

export default ResultDetails;
