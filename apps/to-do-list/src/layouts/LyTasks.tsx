import { TiCancel } from "react-icons/ti";
import TaskBox, { TaskBoxProps } from "../components/TaskBox"
import { FaCheck, FaRegClipboard } from "react-icons/fa";

interface LyTasksProps {
  items: TaskBoxProps[];
}


import logo from '../assets/logo/todo-icon-2048x2048-pij2pwiy.png'

const LyTasks: React.FC<LyTasksProps> = ({ items }) => {
  
  return items.length > 0 ? <div className="w-full  flex flex-row items-start p-2  gap-2  ">
    <div className="w-fit h-auto flex flex-col gap-0 border px-4 rounded-md bg-c3 min-w-[355px] max-h-[85vh] overflow-y-auto ">
      <div className="flex flex-row items-center justify-between  mb-2 pb-2 mt-2 border-b border-c2">
        <FaRegClipboard className="text-c2  font-bold text-2xl " />
        <div className="text-c2  font-bold text-2xl ">
          Pendiente
        </div>
      </div>
      {items.map((item, index) => item.status === 'pending' ? <TaskBox key={index} {...item} /> : null)}
    </div>
    <div className="w-fit h-auto flex flex-col gap-0 border px-4 rounded-md bg-c3 min-w-[355px] ">
      <div className="flex flex-row items-center justify-between  mb-2 pb-2 mt-2 border-b border-c2">
        <FaCheck className="text-c2  font-bold text-2xl " />
        <div className="text-c2  font-bold text-2xl ">
          Listo
        </div>
      </div>
      {items.map((item, index) => item.status === 'done' ? <TaskBox key={index} {...item} /> : null)}
    </div>
    <div className="w-fit h-auto flex flex-col gap-0 border px-4 rounded-md bg-c3 min-w-[355px] ">
      <div className="flex flex-row items-center justify-between  mb-2 pb-2 mt-2 border-b border-c2">

        <TiCancel className="text-c2  font-bold text-2xl " />
        <div className="text-c2  font-bold text-2xl ">
          Cancelado
        </div>
      </div>
      {items.map((item, index) => item.status === 'canceled' ? <TaskBox key={index} {...item} /> : null)}
    </div>
  </div>: <div className="w-full h-full flex items-center justify-center">
    <img src={logo} alt="Logo" className="size-40" />
  </div>
}

export default LyTasks;