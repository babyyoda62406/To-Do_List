import { useContext, useState } from "react";
import { itUser } from "../interfaces/itUser";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContext } from "../contexts/GlobalContext/GobalContext";
import { ColorRing } from 'react-loader-spinner'
import { useNavigate } from "react-router-dom";


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

        <div className="w-full h-screen flex justify-center items-center ">
            <div className="w-fit h-fit">
                <form className="border p-2 rounded-md  text-slate-800 text-xl" onSubmit={handlerSubmit} action="#">
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
                            colors={['#ffffff', '#ffffff',  '#ffffff', '#ffffff', '#ffffff']}
                        />
                            : <button className=" text-slate-800 p-2 rounded-md border" type="submit">
                                Registrarse
                            </button>}
                        <div className="flex flex-row gap-2 items-center">
                            <span className="text-slate-300">¿Ya tienes cuenta?</span>
                            <span  className="text-slate-400 underline cursor-pointer" onClick={() => navHandler('/login')}>Iniciar Sesión</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
}

export default Register;