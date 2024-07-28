import TaskBox, { TaskBoxProps } from "../components/TaskBox"

interface LyTasksProps {
    items: TaskBoxProps[];
}

const LyTasks: React.FC<LyTasksProps> = ({ items }) => {
  return <div className="w-full  flex  flex-col items-center p-2 border ">
    {items.map((item, index) => <TaskBox key={index} {...item} />)}
  </div>   
}

export default LyTasks;