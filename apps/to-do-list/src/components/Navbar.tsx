import { FC } from "react";
import { FaPowerOff } from "react-icons/fa";

interface NavbarProps {
  userEmail: string 
}

const Navbar: FC< NavbarProps> = ({ userEmail }) => {
  return <div className="w-full h-auto flex items-center justify-between p-3 border-b" >
    <div>
      <h1 className="text-3xl font-bold">To Do List</h1>
    </div>
    <div className="flex items-center flex-row gap-2">
      <div> {userEmail} </div>
      {/* Taiwlind tooltip */}
      <FaPowerOff />
    </div>
  </div>
}

export default Navbar;