import { FaUserCircle } from "react-icons/fa";
import { firebaseTimeStampToDate } from "../helpers/firebaseTimeStampToDate";

import { IoOptions } from "react-icons/io5";


export interface TaskBoxProps {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: { _seconds: number, _nanoseconds: number };
    showSetup: (id: string) => void;
}

export const TaskBox: React.FC<TaskBoxProps> = ({ id , title, description, status, createdAt, showSetup }) => {
    const statusTranslator = (status: string) => {
        switch (status) {
            case "pending":
                return <div className="text-c7  font-extrabold">Pendiente</div>
            case "done":
                return <div className="text-c8  font-extrabold">Listo</div>
            case "canceled":
                return <div className="text-c9  font-extrabold">Cancelado</div>
            default:
                return <div className="text-c7  font-extrabold">Pendiente</div>
        }
    }

    return <div className=" w-80  rounded-md p-2 bg-c4 my-2   relative " >

        <div className="text-xl font-bold text-gray-800 flex justify-between items-center " >
            <div className="flex flex-row  items-center gap-1   ">
                <FaUserCircle className="text-c3  font-bold text-2xl  cursor-pointer" /> {title}
            </div>
            <div className="z-20">
                <IoOptions  className="text-c3  font-bold text-2xl  cursor-pointer "  onClick={() => showSetup(id)} />
            </div>
        </div>
        <div className="text-xl font-light text-gray-800">
            {description}
        </div>
        <div className="flex justify-between mt-2 pt-2 border-t border-c3 ">
            <div>
                {statusTranslator(status)}
            </div>

            <div className="font-extrabold text-c5">
                {firebaseTimeStampToDate(createdAt)}
            </div>
        </div>
    </div>
}

export default TaskBox;