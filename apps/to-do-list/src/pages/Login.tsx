import { useContext, useState } from "react";
import { itUser } from "../interfaces/itUser";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContext } from "../contexts/GlobalContext/GobalContext";
import { ColorRing } from 'react-loader-spinner'
import { useNavigate } from "react-router-dom";

import logo from '../assets/logo/todo-icon-2048x2048-pij2pwiy.png'


const Login = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const navHandler = useNavigate();
  const { signIn, saveCredentials } = useContext(GlobalContext);
  const [user, setUser] = useState<itUser>({
    email: '',
    password: ''
  })

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault();
    try {
      const userCredential = await signIn(user)
      setLoading(false)
      toast.success('Usuario Logeado')
      saveCredentials(userCredential)
      navHandler('/')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false)
      const { code } = error
      // Maneja un caso para cada error.code 
      switch (code) {
        case 'auth/invalid-credential':
          toast.error('Correo o contraseña incorrectos')
          break;
        case 'auth/user-not-found':
          toast.error('Usuario no encontrado')
          break;
        case 'auth/wrong-password':
          toast.error('Contraseña incorrecta')
          break;
        case 'auth/invalid-email':
          toast.error('Correo electrónico no válido')
          break;
        case 'auth/user-disabled':
          toast.error('Usuario deshabilitado')
          break;
        default:
          toast.error(error.code)
          break;
      }
    }

  }


  return <>
    <ToastContainer />
    <div className="w-full h-screen flex justify-center items-center bg-c4">
      <div className="w-fit h-fit bg-c3 flex flex-col p-4 rounded-md">
        <div className="text-4xl text-c5 font-bold mb-3 flex flex-row justify-between items-center">
          <div className="text-c6 ">
            To Do List
          </div>
          <img src={logo} alt="logo" className="w-10 h-10" />
        </div>
        <form className="  text-c5 text-2xl  " onSubmit={handlerSubmit} action="#">
          <div className="w-full grid grid-cols-1 gap-0">
            <label className="font-semibold" htmlFor="email">Correo</label>
            <input type="email" name="email" id="ipt-correo" className="w-full p-1  border-b bg-c3 border-b-c5 outline-none" placeholder="my@email.com" required onChange={handlerChange} />
          </div>
          <div className="w-full grid grid-cols-1 gap-0 mt-2">
            <label htmlFor="password" className="font-semibold">Contraseña</label>
            <input type="password" name="password" id="ipt-contraseña" placeholder="********" className="w-full bg-c3  p-1  border-b border-c5 outline-none" required onChange={handlerChange} />
          </div>
          <div className="w-full flex justify-between gap-2 my-2">

            {loading ? <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#333552' , '#333552', '#333552', '#333552', '#333552']}
            />
              : <button className="font-semibold text-c5 bg-c6/75  p-2 rounded-md text-2xl  hover:bg-c6  active:bg-c6/50   " type="submit">
                Entrar
              </button>}
            <div className="flex flex-row gap-2 items-center">
              <span className="text-c5/45">¿No tienes cuenta?</span>
              <span className="text-c5/75 hover:text-c5 underline cursor-pointer" onClick={() => navHandler('/register')}>Registrarse</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </>
}

export default Login;