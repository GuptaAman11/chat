import React from 'react'
import SearchPage from '../SearchPage/SearchPage'
import ChatPage from '../ChatPage/ChatPage'
import './Home.css'

const Home2 = () => {
  return (
    <div className='home-main'>
        <div>
            <SearchPage />
        </div>
        <div>
            <ChatPage />
        </div>
    </div>
  )
}

export default Home2