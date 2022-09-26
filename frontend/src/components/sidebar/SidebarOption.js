import React from 'react';
import './SidebarOption.css';

/** Reusable component for rendering sidebar navigation
 *
 * App -> Routes -> Sidebar -> SidebarOption
 */

const SidebarOption = ({ title, Icon, img }) => {
  // console.debug('Sidebar', 'title=', title, 'Icon=', Icon, 'img=', img);

  return (
    <div className="SidebarOption">
      {Icon && <Icon className="SidebarOption-icon" fontSize="medium" />}
      {img && (
        <img src={img} alt="Liked Songs Icon" className="SidebarOption-liked" />
      )}
      {Icon || img ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  );
};

export default SidebarOption;
