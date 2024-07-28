import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';

const App = () => {
  return <div className="w-full">
    <ToastContainer />
    {/* Routes with react-router-dom */}
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>   
    
  </div>


};

export default App;