import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 15; // Adjust the number of jobs per page

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token'); // Get token from local storage
        const response = await fetch('http://localhost:3000/api/jobs/get-jobs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          },
          credentials: 'include' // Send cookies with the request
        });

        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const data = await response.json();
        const sortedJobs = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setJobs(sortedJobs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobData();
  }, []);

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

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
          All Jobs
        </h1>

        <section className="bg-white shadow-md rounded-lg p-4"> {/* Adjusted padding */}
          {currentJobs.length > 0 ? (
            currentJobs.map((job) => (
              <div
                key={job.id}
                className="border-b border-gray-300 py-1" // Reduced padding
                style={{ marginBottom: '2px', padding: '0 4px' }} // Reduced margin and padding
              >
                <div className="flex justify-center items-center"> {/* Center items horizontally */}
                  <div className="w-full text-center"> {/* Full width and centered text */}
                    <Link
                      to={`/job/${job.id}`}
                      className="text-lg font-serif text-gray-800 hover:underline"
                      style={{ lineHeight: '1.1' }}
                    >
                      {job.title}
                    </Link>
                  </div>
                  <div className="text-right w-full mt-1"> {/* Full width and aligned to right */}
                    <p className="text-gray-500 text-xs">
                      {new Date(job.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short', // Shortened month name
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-gray-500 text-xs">— by Prakash Kumar</p>
                    <p className="text-gray-500 text-xs">in Latest Jobs</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No jobs available at the moment.</p>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4"> {/* Reduced margin */}
            <button
              className={`px-3 py-1 text-white rounded-md ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'}`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <p className="text-sm text-gray-700">Page {currentPage} of {totalPages}</p> {/* Reduced font size */}
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

export default AllJobsPage;
