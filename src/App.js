import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header.js";
import ActivityFeed from "./components/ActivityFeed/ActivityFeed.js";
import Navigation from "./components/Navigation/Navigation.js";
import Archive from "./components/Archive/Archive.js";
import ActivityDetail from "./components/ActivityDetail/ActivityDetail.js";

const BASE_URL = "https://cerulean-marlin-wig.cyclic.app";

const App = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/activities`);
      setActivities(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/home" element={<ActivityFeed activities={activities} setActivities={setActivities}  />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/activity/:activityId" element={<ActivityDetail activities={activities}/>}/>
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
