import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [results, setResults] = useState([]);
  const [admitCards, setAdmitCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_REACT_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem('token'); // Get token from local storage

        // Fetch jobs
        const jobsResponse = await fetch(`${apiUrl}/api/jobs/get-jobs`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          },
          credentials: 'include', // Send cookies with the request
        });

        if (!jobsResponse.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const jobsData = await jobsResponse.json();
        const sortedJobs = jobsData.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setJobs(sortedJobs);

        // Fetch results
        const resultsResponse = await fetch(`${apiUrl}/api/result/get-results`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          },
          credentials: 'include', // Send cookies with the request
        });

        if (!resultsResponse.ok) {
          throw new Error("Failed to fetch results");
        }
        const resultsData = await resultsResponse.json();
        const sortedResults = resultsData.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setResults(sortedResults);

        // Fetch admit cards
        const admitCardsResponse = await fetch(`${apiUrl}/api/admit-card/get-admit-cards`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          },
          credentials: 'include', // Send cookies with the request
        });

        if (!admitCardsResponse.ok) {
          throw new Error("Failed to fetch admit cards");
        }
        const admitCardsData = await admitCardsResponse.json();
        const sortedAdmitCards = admitCardsData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setAdmitCards(sortedAdmitCards);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading data...</div>;
  }

  if (error) {
    return <div className="text-center py-4">Error fetching data: {error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto py-8">
        <h1
          className="font-thin text-slate-700 text-4xl text-center mb-8 leading-tight"
          style={{ fontFamily: "Merriweather" }}
        >
          Latest Sarkari Naukari Updates:
        </h1>
        <h2 className="text-center font-bold text-slate-700 leading-tight mb-20 font-mono">
          Your Gateway To Success
        </h2>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Latest Jobs */}
          <section className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Latest Jobs
            </h2>
            {jobs.length > 0 ? (
              jobs.slice(0, 10).map(job => (
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
                        {new Date(job.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
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

            {/* View More button */}
            <div className="mt-4">
              <Link
                to="/get-all-jobs" // Link to the AllJobsPage
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                View More Jobs
              </Link>
            </div>
          </section>

          {/* Latest Results */}
          <section className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Latest Results
            </h2>
            {results.length > 0 ? (
              results.map(result => (
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
                        {new Date(result.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-gray-500 text-sm">— by Prakash</p>
                      <p className="text-gray-500 text-sm">in Results</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No results available at the moment.</p>
            )}

            {/* View More button */}
            <div className="mt-4">
              <Link
                to="/get-all-results" // Link to the AllResultsPage
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                View More Results
              </Link>
            </div>
          </section>

          {/* Latest Admit Cards */}
          <section className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Latest Admit Cards
            </h2>
            {admitCards.length > 0 ? (
              admitCards.map(admitCard => (
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
                        {new Date(admitCard.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
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

            {/* View More button */}
            <div className="mt-4">
              <Link
                to="/get-all-admit-cards" // Link to the AllAdmitCardsPage
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                View More Admit Cards
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
