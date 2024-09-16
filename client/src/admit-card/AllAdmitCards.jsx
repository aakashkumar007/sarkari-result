import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllAdmitCards = () => {
  const [admitCards, setAdmitCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const admitCardsPerPage = 15; // Adjust the number of admit cards per page

  const apiUrl = import.meta.env.VITE_REACT_API_URL;

  useEffect(() => {
    const fetchAdmitCards = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token'); // Get token from local storage
        const response = await fetch(`${apiUrl}/api/admit-card/get-admit-cards`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          },
          credentials: 'include' // Send cookies with the request
        });

        if (!response.ok) {
          throw new Error('Failed to fetch admit cards');
        }

        const data = await response.json();
        const sortedAdmitCards = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setAdmitCards(sortedAdmitCards);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmitCards();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading data...</div>;
  }

  if (error) {
    return <div className="text-center py-4">Error fetching data: {error}</div>;
  }

  // Pagination logic
  const indexOfLastAdmitCard = currentPage * admitCardsPerPage;
  const indexOfFirstAdmitCard = indexOfLastAdmitCard - admitCardsPerPage;
  const currentAdmitCards = admitCards.slice(indexOfFirstAdmitCard, indexOfLastAdmitCard);

  const totalPages = Math.ceil(admitCards.length / admitCardsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-4">
        <h1 className="font-light text-slate-700 text-2xl text-center mb-4 leading-tight" style={{ fontFamily: 'Merriweather' }}>
          All Admit Cards
        </h1>

        <section className="bg-white shadow-md rounded-lg p-4">

          {currentAdmitCards.length > 0 ? (
            currentAdmitCards.map((admitCard) => (
              <div
                key={admitCard.id}
                className="border-b border-gray-300 py-2"
              >
                <div className="flex justify-between items-center">
                  <div className="w-full text-center">
                    <Link
                      to={`/admit-card/${admitCard.id}`}
                      className="text-lg font-serif text-gray-800 hover:underline"
                      style={{ lineHeight: '1.1' }}
                    >
                      {admitCard.title}
                    </Link>
                  </div>
                  <div className="text-right w-full mt-1">
                    <p className="text-gray-500 text-xs">
                      {new Date(admitCard.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-gray-500 text-xs">— by {admitCard.author || 'Unknown'}</p>
                    <p className="text-gray-500 text-xs">in Latest Admit Cards</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No admit cards available at the moment.</p>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              className={`px-3 py-1 text-white rounded-md ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'}`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <p className="text-sm text-gray-700">Page {currentPage} of {totalPages}</p>
            <button
              className={`px-3 py-1 text-white rounded-md ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'}`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AllAdmitCards;
