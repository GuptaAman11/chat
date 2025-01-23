import React, { useEffect } from 'react'
import { useNotificationHook, useStatusConncetionRequest } from '../Hooks/connectionHook'
import { useSupplier } from '../context/Refresh'

const Notification = () => {
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
    <div className='flex'>
    { notifications?.pendingRequests?.length > 0 ? notifications?.pendingRequests?.map((notification) => (
      <div key={notification.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow mt-4 ml-4">
        <div className="flex flex-col items-center p-4 ">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={notification?.requester?.profileImage} alt="Bonnie image"/>
            <h5 className="mb-1 text-xl font-medium ">{notification?.requester?.name}</h5>
            <div className="flex mt-4 md:mt-6">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800  focus:outline-none  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-1"
                onClick={()=>handleAcceptOnClick(notification._id)}>Accept</button>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800  focus:outline-none  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={()=>handleRejectOnClick(notification._id)}>Reject</button>
            </div>
        </div>
      </div>)): (<h1 className='text-center text-2xl'>No Notification Found</h1>)
    }
    </div>  
  )
}

export default Notification