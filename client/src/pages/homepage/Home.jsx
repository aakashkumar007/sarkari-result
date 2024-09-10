import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Set number of jobs per page
  const jobsPerPage = 20;

  // Dummy data for Results and Admit Cards
  const dummyResults = [
    { id: 1, title: 'SSC CGL 2024 Final Results', date: '2024-08-30' },
    { id: 2, title: 'UPSC Civil Services 2024 Prelims Results', date: '2024-08-25' },
    { id: 3, title: 'IBPS PO 2024 Mains Results', date: '2024-08-15' },
  ];

  const dummyAdmitCards = [
    { id: 1, title: 'SSC MTS 2024 Admit Card', date: '2024-09-10' },
    { id: 2, title: 'UPSC Civil Services 2024 Admit Card', date: '2024-09-01' },
    { id: 3, title: 'Railway Group D Admit Card 2024', date: '2024-08-20' },
  ];

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/jobs/get-jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
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
      <main className="container mx-auto py-8">
        <h1 className="font-thin text-slate-700 text-4xl text-center mb-8 leading-tight" style={{ fontFamily: 'Merriweather' }}>
          Latest Sarkari Naukari Updates:
        </h1>
        <h2 className="text-center font-bold text-slate-700 leading-tight mb-20 font-mono">
          Your Gateway To Success
        </h2>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Latest Jobs */}
          <section className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Latest Jobs</h2>
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <div key={job.id} className="border-b border-gray-300 py-4">
                  <div className="flex justify-between items-start">
                    <div className="w-3/4">
                      <Link
                        to={`/job/${job.id}`}
                        className="text-2xl font-serif text-gray-800 hover:underline"
                      >
                        {job.title}
                      </Link>
                    </div>
                    <div className="text-right w-1/4">
                      <p className="text-gray-500 text-sm">
                        {new Date(job.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-gray-500 text-sm">— by Prakash Kumar</p>
                      <p className="text-gray-500 text-sm">in Latest Jobs</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No jobs available at the moment.</p>
            )}
          </section>

          {/* Latest Results */}
          <section className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Latest Results</h2>
            {dummyResults.length > 0 ? (
              dummyResults.slice(0, 5).map((result) => (
                <div key={result.id} className="border-b border-gray-300 py-4">
                  <div className="flex justify-between items-start">
                    <div className="w-3/4">
                      <Link
                        to={`/result/${result.id}`}
                        className="text-2xl font-serif text-gray-800 hover:underline"
                      >
                        {result.title}
                      </Link>
                    </div>
                    <div className="text-right w-1/4">
                      <p className="text-gray-500 text-sm">
                        {new Date(result.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-gray-500 text-sm">— by Admin</p>
                      <p className="text-gray-500 text-sm">in Results</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No results available at the moment.</p>
            )}
          </section>

          {/* Latest Admit Cards */}
          <section className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Latest Admit Cards</h2>
            {dummyAdmitCards.length > 0 ? (
              dummyAdmitCards.slice(0, 5).map((admitCard) => (
                <div key={admitCard.id} className="border-b border-gray-300 py-4">
                  <div className="flex justify-between items-start">
                    <div className="w-3/4">
                      <Link
                        to={`/admit-card/${admitCard.id}`}
                        className="text-2xl font-serif text-gray-800 hover:underline"
                      >
                        {admitCard.title}
                      </Link>
                    </div>
                    <div className="text-right w-1/4">
                      <p className="text-gray-500 text-sm">
                        {new Date(admitCard.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-gray-500 text-sm">— by Admin</p>
                      <p className="text-gray-500 text-sm">in Admit Cards</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No admit cards available at the moment.</p>
            )}
          </section>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-8">
          <button
            className={`px-4 py-2 text-white rounded-md ${
              currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'
            }`}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p className="text-lg text-gray-700">Page {currentPage} of {totalPages}</p>
          <button
            className={`px-4 py-2 text-white rounded-md ${
              currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
