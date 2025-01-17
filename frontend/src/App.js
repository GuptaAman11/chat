import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './component/Login/Login';
import "./App.css"
import Signup from './component/Login/Signup';
import Home from "./component/Home/Home";
import Home2 from "./component/Home/Home2";
import Connection from "./component/Connections/Connection";
import ModalPage from "./component/CreateGroup/ModalPage";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path='/' element={<Login /> } />
            <Route path='/signup' element={<Signup /> } />
            <Route path='/home' element={<Home /> } />

            <Route path='/conn' element={<Connection /> } />

            <Route path='/modal-page' element={<ModalPage /> } />
            
            <Route path='/chat/:chatId' element={<Home2 /> } />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;