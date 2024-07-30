import React from 'react'
import SearchPage from '../SearchPage/SearchPage'
import './Home.css'
import ChatPage2 from '../ChatPage/ChatPage2'

const Home = () => {
  return (
    <div className='home-main'>
        <div>
            <SearchPage />
        </div>
        <div>
            <ChatPage2 />
        </div>
    </div>
  )
}

export default Home