import React from "react";
import "./ArchivedItem.css";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineCallMade,
  MdOutlineCallReceived,
  MdOutlineUnarchive,
} from "react-icons/md";
import { FcMissedCall } from "react-icons/fc";

const ArchivedItem = ({ activity, onUnarchive }) => {
  const { id, from, to, call_type, created_at, direction } = activity;
  const navigate = useNavigate();
  const formattedTime = new Date(created_at).toLocaleTimeString([], {
    timeStyle: "short",
  });
  const CallIcon =
    direction === "inbound" ? MdOutlineCallReceived : MdOutlineCallMade;
  const MissedCallIcon = call_type === "missed" ? FcMissedCall : null;
  const phoneNumber = direction === "inbound" ? from : to;

  const handleItemClick = () => {
    navigate(`/activity/${id}`);
  };

  const handleUnarchiveClick = (e) => {
    e.stopPropagation();
    onUnarchive(id);
  };

  return (
    <div className="archived-activity-item" onClick={handleItemClick}>
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
      <MdOutlineUnarchive
        className="unarchive-icon"
        onClick={handleUnarchiveClick}
      />
    </div>
  );
};

export default ArchivedItem;
