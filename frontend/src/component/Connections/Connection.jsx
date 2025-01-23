import React ,{useEffect} from 'react'
import {useConnectionHook , useSendConncetionRequest} from '../Hooks/connectionHook'
import { useNavigate } from 'react-router-dom'
const {useSupplier} = require('../context/Refresh')

const Connection = () => {
    const navigate = useNavigate()

    const {shouldUpdate , triggerUpdate} = useSupplier()
    const{connections , getConnections} = useConnectionHook()
    const {sendConnectionRequest} = useSendConncetionRequest()

    console.log(connections.length)
    useEffect(() => {
      getConnections()
    }, [shouldUpdate])

    const handleOnClick = async(id) => {
      await sendConnectionRequest(id)
      triggerUpdate()
    }
  return (
<>
  <div className='flex flex-col justify-center'>
    <div className='w-screen border-t-2 border-gray-500 flex '>
      { connections?.length > 0 ? connections.map((connection) => (
        <div key={connection.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow mt-4 ml-4">
        
            <div className="flex flex-col items-center p-4 ">
              <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={connection?.profileImage} alt={`${connection.name} image`}/>
              <h5 className="mb-1 text-xl font-medium ">Username :- {connection?.username}</h5>
              <h4 className="mb-1 text-xl font-medium">{connection?.name}</h4>

              <div className="flex mt-4 md:mt-6">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={()=>handleOnClick(connection?._id)}>Connect</button>
              </div>
            </div>
        </div>)) : (<h1 className='text-center text-2xl'>No User Found</h1>)
      }
    </div>
      <div className='fixed bottom-10 left-10'>
    <button   className='p-4 bg-green-600 rounded-lg  '
    onClick={()=>navigate('/home')}
    >
    Move Back
    </button>
    </div>
    </div>

    
</>

  )
}

export default Connection