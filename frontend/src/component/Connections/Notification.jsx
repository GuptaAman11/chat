import React, { useEffect } from 'react'
import { useNotificationHook, useStatusConncetionRequest } from '../Hooks/connectionHook'
import { useSupplier } from '../context/Refresh'
import { useNavigate } from 'react-router-dom'

const Notification = () => {
  const navigate = useNavigate()
  const {statusConnectionRequest} = useStatusConncetionRequest()
  const {shouldUpdate , triggerUpdate} = useSupplier()
  const {notifications , getNotifications} = useNotificationHook()
  useEffect(() => {
    getNotifications()
  },[shouldUpdate])
  const handleAcceptOnClick = async(id) => {
    const status = "accepted"
    await statusConnectionRequest(id , status)
    triggerUpdate()
  }
  const handleRejectOnClick = async(id) => {
    const status = "rejected"
    await statusConnectionRequest(id , status)
    triggerUpdate()
  }
  return (
    <div className='flex flex-col items-center'>
      { notifications?.pendingRequests?.length > 0 ? notifications?.pendingRequests?.map((notification) => (
        <div key={notification.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow mt-4">
          <div className="flex flex-col items-center p-4">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={notification?.requester?.profileImage} alt="Profile"/>
            <h5 className="mb-1 text-xl font-medium">{notification?.requester?.username}</h5>
            <h4 className="mb-1 text-xl font-medium">{notification?.requester?.name}</h4>

            <div className="flex mt-4">
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 mr-1"
                onClick={() => handleAcceptOnClick(notification._id)}>Accept</button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                onClick={() => handleRejectOnClick(notification._id)}>Reject</button>
            </div>
          </div>
        </div>
      )) : (
        <h1 className='text-center text-2xl'>No Notification Found</h1>
      )}
      <button className='fixed bottom-4 left-4 p-4 bg-green-600 rounded-lg'
        onClick={() => navigate('/home')}>
        Move Back
      </button>
    </div>
  )
}

export default Notification
