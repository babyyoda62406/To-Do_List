import { UserCredential } from "firebase/auth";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { TaskBoxProps } from "../components/TaskBox";
import LyTasks from "../layouts/LyTasks";
import { GetAllTask } from "../services/Task/GetAllTask";

const Home = () => {
  const navHandler = useNavigate();
  const [user, setUser] = useState<UserCredential>()
  const [tasks, setTasks] = useState<TaskBoxProps[]>([])

  const getAllTask  = async () => {
    const tasks = await GetAllTask()
    setTasks(tasks)
  }

  useEffect(() => {
    if(!sessionStorage.getItem('userCredentials')){
        navHandler('/login')
    }   
    else{
        setUser(JSON.parse(sessionStorage.getItem('userCredentials') as string))
    }
    // FIXME:  get all tasks
    getAllTask;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div className="w-full h-screen flex flex-col ">
    <Navbar userEmail={user?.user.email ?? 'Anónimo '} />
    <LyTasks items={tasks} />

  </div>
}

export default Home;