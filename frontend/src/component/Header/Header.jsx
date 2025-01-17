import React, { useState } from 'react';
import { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenuVisibility = () => {
    setIsMenuVisible(!isMenuVisible);
  };


  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className="flex flex-col justify-between p-3 bg-green-800 text-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="h-10 w-10 rounded-full"
          />
          
        </div>

        <div className="flex items-center gap-10 pr-7 text-lg">
          <FontAwesomeIcon
            icon={faUserGroup}
            className="cursor-pointer"
            onClick={() => navigate('/')}
          />
          <div className="relative" ref={menuRef}>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="cursor-pointer"
              onClick={toggleMenuVisibility}
            />
            {isMenuVisible && (
              <div className="absolute right-0 top-7 bg-white text-black shadow-lg rounded-md w-32">
                <ul className="list-none">
                  <button className="p-2 hover:bg-gray-100"
                          onClick={() => navigate('/modal-page')}
>
                   modal page
                  </button>
                  <li className="p-2 hover:bg-gray-100">
                    <a href="#" className="text-sm">
                      Option two
                    </a>
                  </li>
                  <li className="p-2 hover:bg-gray-100">
                    <a href="#" className="text-sm">
                      Option three
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
