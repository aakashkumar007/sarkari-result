import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage/Home";
import SignIn from "./component/signin/Signin";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./component/dashboard/Dashboard";
import AddJobListing from "./component/dashboard/jobListing/AddJobListing";
import Layout from "../src/component/Layout";
import JobDetails from "./component/dashboard/showJobs/JobDetails";
import UpdateJobListing from "./component/dashboard/updateJob/UpdateJob";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/job/:id" element={<JobDetails />} />

          <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="update-job/:id" element={<UpdateJobListing />} />
            <Route path="" element={<Dashboard />} />
            <Route path="add-job" element={<AddJobListing />} />
           
            
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
