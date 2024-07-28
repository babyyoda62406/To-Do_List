export interface TaskBoxProps {
    id: string;
    title: string;
    owner: string;
    description: string;
    status: string;
    createdAt: Date;
}

export const TaskBox: React.FC<TaskBoxProps> = () => {
    return <div className="size-10 border-2 rounded-md">

    </div>
}

export default TaskBox;