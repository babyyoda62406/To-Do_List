import { useContext, useState } from "react";
import { itUser } from "../interfaces/itUser";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContext } from "../contexts/GlobalContext/GobalContext";
import { ColorRing } from 'react-loader-spinner'
import { useNavigate } from "react-router-dom";


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
    <div className="w-full h-screen flex justify-center items-center  ">
      <div className="w-fit h-fit">
        <form className="border  p-2 rounded-md  text-slate-800 text-xl" onSubmit={handlerSubmit} action="#">
          <div className="w-full grid grid-cols-1 gap-1">
            <label htmlFor="email">Correo Electrónico</label>
            <input type="email" name="email" id="ipt-correo" className="w-full p-1  border-b border-b-slate-700 outline-none" placeholder="my@email.com" required onChange={handlerChange} />
          </div>
          <div className="w-full grid grid-cols-1 gap-1">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" id="ipt-contraseña" placeholder="********" className="w-full p-1  border-b border-b-slate-700 outline-none" required onChange={handlerChange} />
          </div>
          <div className="w-full flex justify-between gap-2 my-2">

            {loading ? <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#32a4be', '#32a4be', '#32a4be', '#32a4be', '#32a4be']}
            />
              : <button className=" border text-slate-800 p-2 rounded-md" type="submit">
                Entrar
              </button>}
            <div className="flex flex-row gap-2 items-center">
              <span  className="text-slate-300">¿No tienes cuenta?</span>
              <span className="text-slate-400 underline cursor-pointer" onClick={() => navHandler('/register')}>Registrarse</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </>
}

export default Login;