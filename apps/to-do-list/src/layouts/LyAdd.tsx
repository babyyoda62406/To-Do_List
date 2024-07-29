import { MdOutlineAddTask } from "react-icons/md"
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useContext, useRef, useState } from "react";
import { BsClipboard2Plus } from "react-icons/bs";
import { ColorRing } from "react-loader-spinner";
import { TiCancel } from "react-icons/ti";
import { itAddTask } from "../interfaces/itAddTask";
import { AddNewTask } from "../services/Task/AddNewTask";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext/GobalContext";

interface LyAddProps {
    update: () => void
}


const LyAdd: React.FC<LyAddProps> = ({ update }) => {
    const navHandler = useNavigate();
    const { clearCredentials , setGlobalStatus } = useContext(GlobalContext)
    const [open, setOpen] = useState<boolean>(false);
    const closeModal = () => {
        setOpen(false)
    }
    const openModal = () => {
        setOpen(true)
    }

    const [task , setTask] = useState<itAddTask>({
        title: "",
        description: "",
    })

    const [loading, setLoading] = useState<boolean>(false);
    
    const handlerChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const response = await AddNewTask(task)
        setLoading(false)
        switch (response) {
            case 201:
                formAdd.current?.reset()
                toast.success("Tarea agregada")
                setGlobalStatus("Loading")
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

    const formAdd = useRef<HTMLFormElement>(null);

    return <div className="flex h-fit relative justify-end  w-full ">
        <Modal open={open} center onClose={closeModal} showCloseIcon={false} classNames={
            {
                modal: 'bg-c3 rounded-md ',
            }
        }>
            <div className="flex flex-row w-full justify-between mb-8 pb-2 border-b border-b-c2">
                <div className="text-3xl text-c6 font-bold">
                    Agregar Tarea
                </div>
                <BsClipboard2Plus className="text-c2 text-4xl cursor-pointer " />
            </div>

            <form className="  text-c5 text-2xl  " onSubmit={handlerSubmit} ref={formAdd} action="#">
                <div className="w-full grid grid-cols-1 gap-0">
                    <label className="font-semibold" htmlFor="email">Títuto</label>
                    <input type="text" name="title" maxLength={10} className="w-full p-1  border-b bg-c3 border-b-c5 outline-none" placeholder="Tarea" required onChange={handlerChange} />
                </div>
                <div className="w-full grid grid-cols-1 gap-0 mt-2">
                    <label htmlFor="password" className="font-semibold">Descripción</label>
                    <textarea name="description" rows={3} placeholder="Fallar planificando es planificar fallar" className="w-full  bg-c3  p-1  border-b border-c5 outline-none  resize-none " required onChange={handlerChange}  ></textarea>
                </div>
                <div className="w-full flex justify-between gap-2 mt-4">
                    <button className="font-semibold text-c5 bg-c9/75  p-2 rounded-md text-2xl  hover:bg-c9  active:bg-c9/50   flex flex-row gap-2 items-center" type="reset" onClick={closeModal}>
                        <div className="">
                            Cancelar
                        </div>
                        <TiCancel className="text-c5   text-3xl " />
                    </button>
                    {loading ? <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#333552', '#333552', '#333552', '#333552', '#333552']}
                    />
                        : <button className="font-semibold text-c5 bg-c6/75  p-2 rounded-md text-2xl  hover:bg-c6  active:bg-c6/50   flex flex-row gap-2 items-center" type="submit">
                            <div className="">
                                Guardar
                            </div>
                            <MdOutlineAddTask className="text-c5 " />
                        </button>}
                </div>
            </form>
        </Modal>

        <div className="p-2 rounded-md bg-c5/75 m-4 shadow shadow-white/40 cursor-pointer hover:bg-c5 active:bg-gray-800 " onClick={openModal}>
            <MdOutlineAddTask className="text-c6 text-5xl" />
        </div>
    </div>
}

export default LyAdd