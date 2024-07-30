import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './component/Login/Login';
import "./App.css"
import Signup from './component/Login/Signup';
import Home from "./component/Home/Home";
import Home2 from "./component/Home/Home2";


function App() {
  return (
    <div className="App">
      
      
      
      <Router>
      
      
        <Routes>



          <Route path='/login' element={<Login /> } />
            <Route path='/signup' element={<Signup /> } />
            <Route path='/home' element={<Home /> } />
            <Route path='/chat/:chatId' element={<Home2 /> } />
           


        </Routes>
      
    </Router>

    </div>
  );
}

export default App;