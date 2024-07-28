import TaskBox, { TaskBoxProps } from "../components/TaskBox"

interface LyTasksProps {
    items: TaskBoxProps[];
}

const LyTasks: React.FC<LyTasksProps> = ({ items }) => {
  return <div className="w'full h-auto flex-col items-center">
    {items.map((item, index) => <TaskBox key={index} {...item} />)}
  </div>   
}

export default LyTasks;