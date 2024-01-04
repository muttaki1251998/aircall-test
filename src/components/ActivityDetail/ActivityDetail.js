import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RxAvatar } from 'react-icons/rx';
import { IoMdArrowRoundBack } from "react-icons/io";
import './ActivityDetail.css';

const ActivityDetail = ({ activities }) => {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const activity = activities.find(a => a.id === activityId);

  if (!activity) {
    return <div className="activity-not-found">Activity not found</div>;
  }

  const { from, created_at } = activity;
  const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const goBack = () => {
    navigate('/home');
  };

  return (
    <div className="activity-detail-container">
      <IoMdArrowRoundBack className="back-arrow" onClick={goBack} />
      <div className="activity-description">
        <div className="avatar-container">
          <RxAvatar size={100} className="avatar" />
        </div>
        <div className="contact-info-box">
          <div className="contact-info">
            <div className="contact-label">Contact info</div>
            <div className="phone-number">{from}</div>
            <div className="activity-date">{formattedDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
