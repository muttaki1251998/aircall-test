import React from "react";
import "./ActivityItem.css";
import { useNavigate } from "react-router-dom";
import { MdOutlineCallMade, MdOutlineCallReceived } from "react-icons/md";
import { FcMissedCall } from "react-icons/fc";
import { BsArchive } from "react-icons/bs";

const ActivityItem = ({ activity, onArchive }) => {
  const { id, from, to, call_type, is_archived, created_at, direction } =
    activity;

  // If the activity is archived or lacks both 'from' and 'to', don't render the component
  if (is_archived || !from || !to) return null;

  const navigate = useNavigate();
  const formattedTime = new Date(created_at).toLocaleTimeString([], {
    timeStyle: "short",
  });

  const CallIcon =
    direction === "inbound" ? MdOutlineCallReceived : MdOutlineCallMade;
  const MissedCallIcon = call_type === "missed" ? FcMissedCall : null;

  const phoneNumber = direction === "inbound" ? from : to;

  const handleArchiveClick = (e) => {
    e.stopPropagation();
    onArchive(id);
  };

  const handleItemClick = () => {
    navigate(`/activity/${id}`);
  };

  return (
    <div className={`activity-item`} onClick={handleItemClick}>
      <div className="activity-meta">
        {MissedCallIcon ? (
          <MissedCallIcon className="activity-icon" />
        ) : (
          <CallIcon className="activity-icon" />
        )}
        <div className="activity-info">
          <div className="activity-number">{phoneNumber}</div>
          <div className="activity-time">{formattedTime}</div>
        </div>
      </div>
      {!is_archived && (
        <div className="archive-icon-container" data-testid="archive-icon" onClick={handleArchiveClick}>
          <BsArchive className="archive-icon" />
        </div>
      )}
    </div>
  );
};

export default ActivityItem;
