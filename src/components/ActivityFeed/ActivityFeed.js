import React from "react";
import ActivityItem from "../ActivityItem/ActivityItem";
import { IoArchiveOutline } from "react-icons/io5";
import "./ActivityFeed.css";

const ActivityFeed = ({
  activities,
  selectActivity,
  setActivities,
  onArchive,
}) => {
  const groupActivitiesByDate = (activities) => {
    return activities.reduce((groups, activity) => {
      if (activity.to || activity.from) {
        const date = new Date(activity.created_at).toDateString();
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(activity);
      }
      return groups;
    }, {});
  };

  const archiveAll = () => {
    activities.forEach((activity) => {
      if (!activity.is_archived) {
        onArchive(activity.id);
      }
    });
  };

  const sortedDates = Object.entries(groupActivitiesByDate(activities))
    .filter(([date, groupedActivities]) =>
      groupedActivities.some((activity) => !activity.is_archived)
    )
    .sort((a, b) => new Date(b[0]) - new Date(a[0]));

  return (
    <div className="activity-feed">
      <div className="archive-all-button" onClick={archiveAll}>
        <IoArchiveOutline />
        Archive All
      </div>
      {sortedDates.map(([date, groupedActivities]) => {
        const nonArchivedActivities = groupedActivities.filter(
          (activity) => !activity.is_archived && activity.from && activity.to
        );
        if (nonArchivedActivities.length === 0) return null; // Don't show date header if all activities are archived
        return (
          <div key={date}>
            <div className="date-header">
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="date-group">
              {nonArchivedActivities.map((activity) => (
                <ActivityItem
                  key={activity.id}
                  activity={activity}
                  selectActivity={selectActivity}
                  onArchive={onArchive}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityFeed;
