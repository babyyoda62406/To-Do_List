import { FC, useContext } from "react";
import { FaPowerOff } from "react-icons/fa";
import { GlobalContext } from "../contexts/GlobalContext/GobalContext";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  userEmail: string 
}



const Navbar: FC< NavbarProps> = ({ userEmail }) => {
  const {clearCredentials} = useContext(GlobalContext)
  const navHandler = useNavigate();

  const logOut = () => {
    clearCredentials()
    navHandler('/login')  
  }
  return <div className="w-full h-auto flex items-center justify-between p-3  bg-c5" >
    <div>
      <h1 className="text-3xl font-bold text-c6">To Do List</h1>
    </div>
    <div className="flex items-center flex-row gap-2 ">
      <div className="text-c4 text-2xl"> {userEmail} </div>
      {/* Taiwlind tooltip */}
      <FaPowerOff className="text-2xl cursor-pointer text-c6/75 hover:text-c6 active:text-c6/55" data-tooltip-target="tooltip" data-tooltip-placement="bottom" onClick={logOut} />
    </div>
  </div>
}

export default Navbar;