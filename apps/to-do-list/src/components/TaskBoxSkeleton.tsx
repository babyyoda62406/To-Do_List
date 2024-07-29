import {  ReactNode } from "react";


interface TaskBoxSkeletonProps {
    taskBox: ReactNode;
}

const TaskBoxSkeleton: React.FC<TaskBoxSkeletonProps> = ({ taskBox }) => {
    return <div className="w-full flex flex-col gap-0 h-auto  px-4 py-2 rounded-md max-h-[80vh] overflow-y-auto  opacity-40" >
        {taskBox}
    </div>
}

export default TaskBoxSkeleton; 
