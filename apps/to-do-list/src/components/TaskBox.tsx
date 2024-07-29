import { FaUserCircle } from "react-icons/fa";
import { firebaseTimeStampToDate } from "../helpers/firebaseTimeStampToDate";

export interface TaskBoxProps {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: { _seconds: number, _nanoseconds: number };
}

export const TaskBox: React.FC<TaskBoxProps> = ({ title, description, status, createdAt }) => {
    const statusTranslator  = (status: string) => {
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
    
    return <div className=" w-80  rounded-md p-2 bg-c4 my-2  ">
        <div className="text-xl font-bold text-gray-800 flex justify-between items-center " >
            <div>
                {title}
            </div>
            <FaUserCircle className="text-c3  font-bold text-2xl  cursor-pointer"  />
        </div>
        <div className="text-xl font-light text-gray-800">
            {description}
        </div>
        <div className="flex justify-between mt-2 pt-2 border-t border-c3 ">
            <div>
                { statusTranslator(status) }
            </div>

            <div className="font-extrabold text-c5">
                {firebaseTimeStampToDate(createdAt)}
            </div>
        </div>
    </div>
}

export default TaskBox;