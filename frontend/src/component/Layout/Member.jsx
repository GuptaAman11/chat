import React from 'react';
import { useModal } from '../context/ModalContext';

const Member = ({chatMember}) => {
    const {closeModal} = useModal();
  return(
    <div className='relative w-full h-full bg-white rounded-md'>
        <div className="flex flex-col flex-grow items-center gap-5 p-32 overflow-scroll">
            <div className="flex flex-col gap-5">
            {chatMember?.map((user) => (
                <div key={user.id} className="flex items-center gap-5">
                <img
                    src="https://via.placeholder.com/40"
                    alt="User Avatar"
                    className="h-12 w-12 rounded-full"
                />
                <span className='text-xl font-bold'>{user?.name}</span>
                </div>
            ))}
            </div>
            <div className='flex gap-9 mt-3 '>
                <button className='font-san text-lg text-white bg-black px-4 py-3 rounded-lg'>Add </button>
                <button className='font-san text-lg text-white bg-black px-4 py-3 rounded-lg'>Remove</button>
            </div>
            <button className='absolute right-5 bottom-5 font-sans font-bold bg-black text-white p-3 rounded-lg '
            onClick={() => closeModal()} >close</button>
        </div>
    </div>
  )
};

export default Member;
