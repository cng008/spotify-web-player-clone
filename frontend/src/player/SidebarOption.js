import React from 'react';
// import './SidebarOption.css';

const SidebarOption = ({ title, Icon }) => {
  return (
    <div className="SidebarOption">
      {Icon && <Icon className="SidebarOption-icon" />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  );
};

export default SidebarOption;
