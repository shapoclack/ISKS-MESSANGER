import ChatRoom from "./components/ChatRoom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import {BrowserRouter,Routes,Route} from "react-router-dom";


function App() {
  return (
    <div>


   <BrowserRouter>
            <Routes>
              <Route path="/home" element= { <Home/>} />
              <Route path="/chatroom" element= { <ChatRoom/>} />
              <Route path="/register" element= { <Register/>} />
              <Route path="/" element= { <Login/>} />
            </Routes>
   </BrowserRouter>


    </div>
  );
}

export default App;
