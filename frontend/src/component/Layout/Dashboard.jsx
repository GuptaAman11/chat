import React from 'react';
import { useModal } from '../context/ModalContext';

const Dashboard = ({chatName}) => {
    const { closeModal } = useModal();
  return (
    <div className='relative w-full h-full bg-white rounded-md'>
    <div>
        <div className=" flex flex-col flex-grow items-center gap-5 p-32">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="h-24 w-24 rounded-full"
          />
          <span className='text-2xl font-bold'>{chatName}</span>
          <button className='absolute right-5 bottom-5 font-sans font-bold bg-black text-white p-3 rounded-lg '
            onClick={() => closeModal()} >close</button>
          
        </div>
    </div>
    </div>
  )
};

export default Dashboard;
