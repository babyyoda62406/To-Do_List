import { firebaseTimeStampToDate } from "../helpers/firebaseTimeStampToDate";

export interface TaskBoxProps {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: { _seconds: number, _nanoseconds: number };
}

export const TaskBox: React.FC<TaskBoxProps> = ({ title, description, status, createdAt }) => {

    return <div className=" w-72 border-2 rounded-md">
        <div>
            {title}
        </div>
        <div>
            {description}
        </div>
        <div className="flex justify-between ">
            <div>
                {status}
            </div>

            <div>
                {firebaseTimeStampToDate(createdAt)}
            </div>
        </div>

    </div>
}

export default TaskBox;