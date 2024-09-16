import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AdmitCardDetails = () => {
  const { id } = useParams(); // Get the admit card ID from the URL
  const navigate = useNavigate();
  const [admitCard, setAdmitCard] = useState(null);
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
    const fetchAdmitCardDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiUrl}/api/admit-card/get-admit-card/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch admit card details');
        }

        const data = await response.json();
        setAdmitCard(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmitCardDetails();
  }, [id]);

  const handleUpdate = () => {
    navigate(`/dashboard/update-admit-card/${id}`);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/api/admit-card/delete-admit-card/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete admit card');
      }

      toast.success('Admit Card Deleted successfully');
      navigate('/');
    } catch (err) {
      setError('Failed to delete admit card');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!admitCard) {
    return <div>No admit card found</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admit Card Details</h1>
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
                <td className="py-2 px-4 border-b">{admitCard.title}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Description</td>
                <td className="py-2 px-4 border-b">
                  <div dangerouslySetInnerHTML={{ __html: admitCard.description }} />
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Created At</td>
                <td className="py-2 px-4 border-b">{new Date(admitCard.created_at).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>

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

export default AdmitCardDetails;
