import { TiCancel } from "react-icons/ti";
import TaskBox, { TaskBoxProps } from "../components/TaskBox"
import { FaCheck, FaRegClipboard } from "react-icons/fa";
import logo from '../assets/logo/todo-icon-2048x2048-pij2pwiy.png'
import Modal from "react-responsive-modal";
import { useContext, useState } from "react";
import { IoOptions } from "react-icons/io5";
import { BsTrash3 } from "react-icons/bs";
import { setStatusTask } from "../services/Task/setStatusTask";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext/GobalContext";
import { ColorRing } from "react-loader-spinner";

interface LyTasksProps {
  items: TaskBoxProps[];
  update: () => void;
}


const LyTasks: React.FC<LyTasksProps> = ({ update, items }) => {
  const navHandler = useNavigate();
  const { clearCredentials, setGlobalStatus } = useContext(GlobalContext)

  const [taskActive, setTaskActive] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [setupOpen, setSetupOpen] = useState(false);
  const closeModal = () => {
    setSetupOpen(false)
  }

  const showSetup = (id: string) => {
    setTaskActive(id)
    setSetupOpen(true)
  }

  const changeStatusTask = async (status: string) => {
    setLoading(true)
    const response = await setStatusTask(taskActive, status)
    setLoading(false)

    switch (response) {
      case 200:
        setGlobalStatus("Loading")
        toast.success("Tarea actualizada")
        closeModal()
        update()
        break;
      case 401:
        clearCredentials()
        navHandler('/login')
        break;
      default:
        console.log(response)
        break;
    }
  }


  return items.length > 0 ? <div className="w-full  flex flex-row items-start p-2  gap-2  ">
    {/* Pendiente  */}
    <div className="w-fit h-auto flex flex-col gap-0 border px-0 rounded-md bg-c3 min-w-[355px] ">
      <div className="flex flex-row items-center justify-between  mb-0 px-0 mx-4 pb-2 mt-2 border-b border-c2">
        <FaRegClipboard className="text-c2  font-bold text-2xl " />
        <div className="text-c2  font-bold text-2xl  ">
          Pendiente
        </div>
      </div>
      <div className=" w-full flex flex-col gap-0 h-auto  px-4 py-2 rounded-md max-h-[80vh] overflow-y-auto  ">
        {items.map((item, index) => item.status === 'pending' ? <TaskBox key={index} {...item} showSetup={showSetup} /> : null)}
      </div>
    </div>
    {/* Listo  */}
    <div className="w-fit h-auto flex flex-col gap-0 border px-0 rounded-md bg-c3 min-w-[355px] ">
      <div className="flex flex-row items-center justify-between  mb-0 px-0 mx-4 pb-2 mt-2 border-b border-c2">
        <FaCheck className="text-c2  font-bold text-2xl " />
        <div className="text-c2  font-bold text-2xl  ">
          Listo
        </div>
      </div>
      <div className=" w-full flex flex-col gap-0 h-auto  px-4 py-2 rounded-md max-h-[80vh] overflow-y-auto  ">
        {items.map((item, index) => item.status === 'done' ? <TaskBox key={index} {...item} showSetup={showSetup} /> : null)}
      </div>
    </div>
    {/* Cancelado  */}
    <div className="w-fit h-auto flex flex-col gap-0 border px-0 rounded-md bg-c3 min-w-[355px] ">
      <div className="flex flex-row items-center justify-between  mb-0 px-0 mx-4 pb-2 mt-2 border-b border-c2">
        <TiCancel className="text-c2  font-bold text-2xl " />
        <div className="text-c2  font-bold text-2xl  ">
          Cancelado
        </div>
      </div>
      <div className=" w-full flex flex-col gap-0 h-auto  px-4 py-2 rounded-md max-h-[80vh] overflow-y-auto  ">
        {items.map((item, index) => item.status === 'canceled' ? <TaskBox key={index} {...item} showSetup={showSetup} /> : null)}
      </div>

      <Modal open={setupOpen} center onClose={closeModal} showCloseIcon={false} classNames={
        {
          modal: 'bg-c3 rounded-md ',
        }
      }>
        <div className="flex flex-row w-full justify-between mb-2 pb-2 border-b border-b-c2">
          <div className="text-3xl text-c6 font-bold">
            Opciones
          </div>
          <IoOptions className="text-c2 text-4xl cursor-pointer " />
        </div>

        <div className=" w-80  rounded-md p-2 bg-c4 my-0   relative flex justify-around items-center " >
          {loading ? <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#333552', '#333552', '#333552', '#333552', '#333552']}
          />
            : <FaRegClipboard className="text-c2  font-bold text-4xl cursor-pointer" onClick={()=> changeStatusTask('pending')}  />}

          {loading ? <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#333552', '#333552', '#333552', '#333552', '#333552']}
          />
            : <FaCheck className="text-c2  font-bold  text-4xl  cursor-pointer " onClick={()=> changeStatusTask('done')} />}
          {loading ? <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#333552', '#333552', '#333552', '#333552', '#333552']}
          />
            : <TiCancel className="text-c2  font-bold text-4xl  cursor-pointer " onClick={()=> changeStatusTask('canceled')}  />}
          {loading ? <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#333552', '#333552', '#333552', '#333552', '#333552']}
          />
            : <BsTrash3 className="text-c2  font-bold text-4xl  cursor-pointer " onClick={()=> changeStatusTask('deleted')}  />}
        </div>

      </Modal>

    </div>
  </div> : <div className="w-full h-full flex items-center justify-center">
    <img src={logo} alt="Logo" className="size-40" />
  </div>
}

export default LyTasks;