import React from "react";
import axios from 'axios';
import ActivityItem from "../ActivityItem/ActivityItem";
import "./ActivityFeed.css";

const ActivityFeed = ({ activities, selectActivity, setActivities }) => {
  const groupActivitiesByDate = (activities) => {
    return activities.reduce((groups, activity) => {
      const date = new Date(activity.created_at).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      if (activity.to || activity.from) {
        groups[date].push(activity);
      }
      return groups;
    }, {});
  };

  const BASE_URL = "https://cerulean-marlin-wig.cyclic.app";

  const onArchive = async (callId) => {
    try {
      await axios.put(`${BASE_URL}/activities/${callId}`, { is_archived: true });
      setActivities(prevActivities => prevActivities.filter(activity => activity.id !== callId));
    } catch (error) {
      console.error('Error archiving the call:', error);
    }
  };

  const sortedDates = Object.entries(groupActivitiesByDate(activities)).sort(
    (a, b) => new Date(b[0]) - new Date(a[0])
  );

  return (
    <div className="activity-feed">
      {sortedDates.map(([date, groupedActivities]) => (
        <div key={date}>
          <div className="date-header">{new Date(date).toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric"
          })}</div>
          <div className="date-group">
            {groupedActivities.filter(activity => activity.to || activity.from).map(activity => (
              <ActivityItem key={activity.id} activity={activity} selectActivity={selectActivity} onArchive={onArchive} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;
