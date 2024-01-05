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

  const onArchive = async (callId) => {
    try {
      await axios.patch(`${BASE_URL}/activities/${callId}`, {
        is_archived: true,
      });
      setActivities((prevActivities) =>
        prevActivities.map((activity) =>
          activity.id === callId ? { ...activity, is_archived: true } : activity
        )
      );
    } catch (error) {
      console.error("Error archiving the call:", error);
    }
  };

  const onUnarchive = async (callId) => {
    try {
      const response = await axios.patch(`${BASE_URL}/activities/${callId}`, {
        is_archived: false,
      });

      if (response.status === 200) {
        setActivities((prevActivities) =>
          prevActivities.map((activity) =>
            activity.id === callId
              ? { ...activity, is_archived: false }
              : activity
          )
        );
      }
    } catch (error) {
      console.error("Error unarchiving the call:", error);
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
          <Route
            path="/"
            element={
              <ActivityFeed
                activities={activities}
                setActivities={setActivities}
                onArchive={onArchive}
              />
            }
          />
          <Route
            path="/archive"
            element={
              <Archive
                activities={activities}
                onArchive={onArchive}
                onUnarchive={onUnarchive}
              />
            }
          />
          <Route
            path="/activity/:activityId"
            element={<ActivityDetail activities={activities} />}
          />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
