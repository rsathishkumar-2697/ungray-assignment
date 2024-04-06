import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBullhorn, faCodeBranch, faPlug, faUsers, faCog } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-heading">
        <h3>Salesway</h3>
        <ul className="sidebar-menu">
          <li><FontAwesomeIcon icon={faCog} /> Settings</li>
          <li><FontAwesomeIcon icon={faUsers} /> Team</li>
        </ul>
      </div>

      <div className="sidebar-menu">
        <h6>MENU</h6>
        <ul>
          <li><FontAwesomeIcon icon={faTachometerAlt} /> Dashboard</li>
          <li><FontAwesomeIcon icon={faBullhorn} /> Campaigns</li>
          <li><FontAwesomeIcon icon={faCodeBranch} /> Flows</li>
          <li><FontAwesomeIcon icon={faPlug} /> Integrations</li>
          <li><FontAwesomeIcon icon={faUsers} /> Customers</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;