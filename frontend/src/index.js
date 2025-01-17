import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ChatProvider from './component/context/ChatProvider';
import { RefreshProvider } from './component/context/Refresh';
import { ModalProvider } from './component/context/ModalContext';
import { SocketProvider } from './component/context/SocketContext';
import { ResponsiveProvider } from './component/context/responsiveContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ResponsiveProvider>
  <RefreshProvider>
    <ModalProvider>
      <ChatProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </ChatProvider>
    </ModalProvider>
  </RefreshProvider>

  </ResponsiveProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
