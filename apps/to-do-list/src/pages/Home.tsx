import { UserCredential } from "firebase/auth";
import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { TaskBoxProps } from "../components/TaskBox";
import LyTasks from "../layouts/LyTasks";
import { GetAllTask } from "../services/Task/GetAllTask";
import { GlobalContext } from "../contexts/GlobalContext/GobalContext";
import Footer from "../components/Footer";
import LyAdd from '../layouts/LyAdd';

const Home = () => {
  const navHandler = useNavigate();
  const { clearCredentials } = useContext(GlobalContext)
  const [user, setUser] = useState<UserCredential>()
  const [tasks, setTasks] = useState<TaskBoxProps[]>([])
  const { setGlobalStatus } = useContext(GlobalContext)

  const getAllTask = async () => {
    setGlobalStatus("Loading")
    const tasks = await GetAllTask() ?? []
    if (tasks === 401) {
      clearCredentials()
      navHandler('/login')
    }
    setTasks(tasks)
    setGlobalStatus("Online")
  }

  useEffect(() => {
    if (!sessionStorage.getItem('userCredentials')) {
      navHandler('/login')
    }
    else {
      setUser(JSON.parse(sessionStorage.getItem('userCredentials') as string))
    }
    getAllTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div className="relative w-fit h-screen flex flex-col bg-c2 border-r border-l border-c1/55 border-dashed">
    <Navbar userEmail={user?.user.email ?? 'Anónimo '} />
    <LyTasks items={tasks} update={getAllTask} />

    <div className="flex flex-col justify-center items-center w-full h-fit  absolute bottom-0">
      <LyAdd update={getAllTask} />
      <Footer />
    </div>
  </div>
}

export default Home;