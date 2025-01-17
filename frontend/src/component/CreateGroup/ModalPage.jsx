import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetFriends } from '../Hooks/connectionHook';
import { useCreateGroup } from '../Hooks/chatHooks';

const ModalPage = () => {
  const { createGroup } = useCreateGroup();
  const { friends, getFriends } = useGetFriends();
  const [groupName, setGroupName] = useState('');
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getFriends();
  }, []);

  const filteredNames =
    friends?.connectedUserDetails?.filter((user) =>
      user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const handleAddName = (name, id) => {
    if (!selectedNames.includes(name)) {
      setSelectedNames([...selectedNames, name]);
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleRemoveName = (name) => {
    const index = selectedNames.indexOf(name);
    if (index !== -1) {
      const newNames = [...selectedNames];
      const newIds = [...selectedIds];
      newNames.splice(index, 1);
      newIds.splice(index, 1);
      setSelectedNames(newNames);
      setSelectedIds(newIds);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission reload
    if (selectedIds.length > 1 && groupName) {
      await createGroup(selectedIds, groupName);
    } else {
      alert('Please select users and enter a group name!');
    }
  };

  return (
    <div className="relative">
      {/* Top bar for selected names */}
      <div className="fixed top-0 left-0 right-0 bg-gray-200 p-4 flex gap-2 flex-wrap z-10">
        {selectedNames.map((name, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-300 px-4 py-2 rounded"
          >
            <span>{name}</span>
            <button
              className="ml-2 text-red-600 font-bold"
              onClick={() => handleRemoveName(name)}
            >
              ×
            </button>
          </div>
        ))}
        <button
          className="ml-auto bg-red-500 text-white py-1 px-3 rounded"
          onClick={() => navigate('/home')}
        >
          Back
        </button>
      </div>

      {/* Modal Content */}
      <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white rounded-lg p-6 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 shadow-md relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Select Names</h2>
          </div>
          <form onSubmit={handleOnSubmit}>
            <input
              type="text"
              placeholder="Search names..."
              className="w-full border p-2 rounded mb-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <input
              type="text"
              placeholder="Group Name"
              className="w-full border p-2 rounded mb-4"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
            <ul className="max-h-40 overflow-y-auto">
              {filteredNames.map((user) => (
                <li
                  key={user.userId}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <span>{user?.name}</span>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent form submit when clicking +
                      handleAddName(user?.name, user?.userId);
                    }}
                  >
                    +
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="bg-green-500 p-2 rounded-md text-left mt-2 w-full"
              type="submit"
            >
              Create Group
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalPage;
