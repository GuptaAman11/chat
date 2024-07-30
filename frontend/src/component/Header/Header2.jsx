import React from 'react';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup , faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const Header2 = () => {
  return (
    <div className="header">
      <div className="header-options">
        <div className="header-first">
            <img src="data:image/jpeg;base64,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" alt="" className='btn-profile' />
            <div className="group-name">Aman</div>
        </div>
        <div className="header-second">
        <FontAwesomeIcon icon={faUserGroup} className='icons'/>
        <FontAwesomeIcon icon={faEllipsisVertical} className='icons' />
      </div>
      </div>
    </div>
  );
};

export default Header2;