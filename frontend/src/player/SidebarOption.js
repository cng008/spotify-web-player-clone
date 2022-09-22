import React from 'react';
import './SidebarOption.css';

const SidebarOption = ({ title, Icon, img }) => {
  return (
    <div className="SidebarOption">
      {Icon && <Icon className="SidebarOption-icon" fontSize="large" />}
      {img && (
        <img src={img} alt="Liked Songs Icon" className="SidebarOption-liked" />
      )}
      {Icon || img ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  );
};

export default SidebarOption;
