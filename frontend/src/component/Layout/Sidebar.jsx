import React from 'react';

const Sidebar = ({ setActiveComponent }) => {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <nav className="flex-grow">
        <ul className="space-y-4 p-4">
          <li>
            <button
              onClick={() => setActiveComponent('dashboard')}
              className="block w-full text-left py-2 px-4 rounded hover:bg-gray-600"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('Members')}
              className="block w-full text-left py-2 px-4 rounded hover:bg-gray-600"
            >
              Members
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
