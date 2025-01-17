import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../context/ModalContext';

const Header = () => {
  const navigate = useNavigate();
  const {openModal} = useModal();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenuVisibility = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className="flex flex-col justify-between p-3 bg-green-800 text-white w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5" onClick={openModal}>
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
          <div className="relative">
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="cursor-pointer"
              onClick={toggleMenuVisibility}
            />
            {isMenuVisible && (
              <div className="absolute right-0 top-8 bg-white text-black shadow-lg rounded-md z-10">
                <ul className="list-none">
                  <li className="p-2 hover:bg-gray-100">
                    <a href="#" className="text-sm">
                      Option one
                    </a>
                  </li>
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
