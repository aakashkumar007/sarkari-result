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
import AllJobsPage from "./component/dashboard/allJobs/AllJobs";
import AllResult from "./result/AllResult";
import AdmitCard from "./admit-card/AdmitCardDetails";
import AddResult from "./result/AddResult";
import ResultDetails from "./result/ResultDetails";
import UpdateResult from "./result/UpdateResult";
import AddAdmitCardPage from "./admit-card/AddAdmitCard";
import UpdateAdmitCardPage from "./admit-card/UpdateAdmitCardPage";
import AllAdmitCards from "./admit-card/AllAdmitCards";
import AdmitCardDetails from "./admit-card/AdmitCardDetails";


const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/get-all-jobs" Component={AllJobsPage} />
          <Route path="/get-all-results" Component={AllResult} />
          <Route path="/get-all-admit-cards" Component={AllAdmitCards} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="job/:id" element={<JobDetails />} />
          <Route path="result/:id" element={<ResultDetails />} />
          <Route path="admit-card/:id" element={<AdmitCardDetails/>} />
      
          <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="update-job/:id" element={<UpdateJobListing />} />
            <Route path="" element={<Dashboard />} />
            <Route path="add-job" element={<AddJobListing />} />

            <Route path="add-result" element={<AddResult />} />
            <Route path="update-result/:id" element={<UpdateResult />} />

            <Route path="add-admit-card" element={<AddAdmitCardPage />} />
            <Route path="update-admit-card/:id" element={<UpdateAdmitCardPage />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
