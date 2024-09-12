import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateAdmitCardPage = () => {
  const { id } = useParams();
  const [admitCard, setAdmitCard] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmitCard = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/admit-cards/get-admit-card/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch admit card');
        }
        const data = await response.json();
        setAdmitCard(data);
        setTitle(data.title);
        setDescription(data.description);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAdmitCard();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/admit-cards/update-admit-card/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to update admit card');
      }
      navigate('/admit-cards');
    } catch (error) {
      setError(error.message);
    }
  };

  if (!admitCard) return <div>Loading...</div>;

  return (
    <div>
      <h1>Update Admit Card</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {error && <div>Error: {error}</div>}
        <button type="submit">Update Admit Card</button>
      </form>
    </div>
  );
};

export default UpdateAdmitCardPage;
