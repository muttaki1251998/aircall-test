import React from "react";
import ArchivedItem from "./ArchivedItem/ArchivedItem";
import "./Archive.css";
import { MdOutlineUnarchive } from "react-icons/md";

const Archive = ({ activities, onUnarchive }) => {
  const unarchiveAll = () => {
    activities.forEach((activity) => {
      if (activity.is_archived) {
        onUnarchive(activity.id);
      }
    });
  };

  return (
    <div className="archive-feed">
      <div className="unarchive-all-button" onClick={unarchiveAll}>
        <MdOutlineUnarchive />
        Unarchive All
      </div>
      {activities
        .filter((activity) => activity.is_archived)
        .map((activity) => (
          <ArchivedItem
            key={activity.id}
            activity={activity}
            onUnarchive={onUnarchive}
          />
        ))}
    </div>
  );
};

export default Archive;
