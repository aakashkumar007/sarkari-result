import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllResult = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 15; // Adjust the number of results per page

  const apiUrl = import.meta.env.VITE_REACT_API_URL;

  useEffect(() => {
    const fetchResultsData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token'); // Get token from local storage
        const response = await fetch(`${apiUrl}/api/result/get-results`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          },
          credentials: 'include' // Send cookies with the request
        });

        if (!response.ok) {
          throw new Error('Failed to fetch results');
        }

        const data = await response.json();
        const sortedResults = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setResults(sortedResults);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResultsData();
  }, []);

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  // Pagination logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  const totalPages = Math.ceil(results.length / resultsPerPage);

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
          All Results
        </h1>

        <section className="bg-white shadow-md rounded-lg p-4">
          {currentResults.length > 0 ? (
            currentResults.map((result) => (
              <div
                key={result.id}
                className="border-b border-gray-300 py-1"
                style={{ marginBottom: '2px', padding: '0 4px' }}
              >
                <div className="flex justify-center items-center">
                  <div className="w-full text-center">
                    <Link
                      to={`/result/${result.id}`}
                      className="text-lg font-serif text-gray-800 hover:underline"
                      style={{ lineHeight: '1.1' }}
                    >
                      {result.title}
                    </Link>
                  </div>
                  <div className="text-right w-full mt-1">
                    <p className="text-gray-500 text-xs">
                      {new Date(result.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-gray-500 text-xs">— by {result.author || 'Unknown'}</p>
                    <p className="text-gray-500 text-xs">in Latest Results</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No results available at the moment.</p>
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

export default AllResult;
