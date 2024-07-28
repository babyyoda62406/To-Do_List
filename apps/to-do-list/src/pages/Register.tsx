import { useContext, useState } from "react";
import { itUser } from "../interfaces/itUser";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContext } from "../contexts/GlobalContext/GobalContext";
import { ColorRing } from 'react-loader-spinner'
import { useNavigate } from "react-router-dom";

import logo from '../assets/logo/todo-icon-2048x2048-pij2pwiy.png'

const Register = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const navHandler = useNavigate();
    const { signUp, saveCredentials } = useContext(GlobalContext);
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
            const userCredential = await signUp(user)
            setLoading(false)
            toast.success('Registro exitoso')
            saveCredentials(userCredential)
            navHandler('/')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setLoading(false)
            const {code} = error
            // Firebase error codes
            switch (code) {
                case 'auth/email-already-in-use':
                    toast.error('El correo ya esta en uso')
                    break;
                case 'auth/invalid-email':
                    toast.error('Correo no valido')
                    break;
                case 'auth/operation-not-allowed':
                    toast.error('No tienes permisos para hacer esto')
                    break;
                case 'auth/weak-password':
                    toast.error('Contraseña demasiado débil')
                    break;
                default:
                    toast.error('No podemos crear usuarios en este momento')
                    break;
            }
        }

    }


    return <>

        <div className="w-full h-screen flex justify-center items-center bg-c4">
            <div className="w-fit h-fit bg-c3 flex flex-col p-4 rounded-md">
                <div className="text-4xl text-c5 font-bold mb-3 flex flex-row justify-between items-center">
                    <div className="text-c6">
                        To Do List 
                    </div>
                    <img src={logo} alt="logo" className="w-10 h-10" />
                </div>
                <form className="text-c5 text-2xl" onSubmit={handlerSubmit} action="#">
                    <div className="w-full grid grid-cols-1 gap-0">
                        <label htmlFor="email" className="font-semibold">Correo</label>
                        <input type="email" name="email" id="ipt-correo" className="w-full p-1 bg-c3  border-b border-b-c5 outline-none" placeholder="my@email.com" required onChange={handlerChange} />
                    </div>
                    <div className="w-full grid grid-cols-1 gap-0 mt-3">
                        <label htmlFor="password" className="font-semibold">Contraseña</label>
                        <input type="password" name="password" id="ipt-contraseña" placeholder="********" className="w-full p-1  bg-c3 border-b border-b-c5 outline-none" required onChange={handlerChange} />
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
                            : <button className=" bg-c6/75 hover:bg-c6 active:bg-c6/55 text-c5 font-semibold p-2 rounded-md " type="submit">
                                Registrarse
                            </button>}
                        <div className="flex flex-row gap-2 items-center">
                            <span className="text-c5/45">¿Ya tienes cuenta?</span>
                            <span  className="text-c5/75 hover:text-c5 underline cursor-pointer" onClick={() => navHandler('/login')}>Iniciar Sesión</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
}

export default Register;