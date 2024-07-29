import { useContext, useEffect } from "react"
import { GlobalContext } from "../contexts/GlobalContext/GobalContext"
import { ColorRing } from "react-loader-spinner"
import { FaPlugCircleCheck } from "react-icons/fa6"

const Footer = () => {
    const { appStatus } = useContext(GlobalContext)

    useEffect(() => {

    }, [appStatus])
    const getHtmlStatus = () => {
        switch (appStatus) {
            case "Loading":
                return <div className="flex flex-row items-center gap-2">
                    <p>Cargando...</p>
                    <ColorRing
                        visible={true}
                        height="30"
                        width="30"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#0096ff', '#0096ff', '#0096ff', '#0096ff', '#0096ff']}
                    />
                </div>

            case "Online":
                return <div className="flex flex-row items-center gap-2">
                    <p className="">En línea</p>
                    <FaPlugCircleCheck />
                    
                </div>
            default:
                return <p>Error</p>
        }
    }

    return <div className="flex flex-row justify-between items-center w-full  bg-c5 p-2 border-t border-white/20 ">
        <div className="text-3xl text-c6 font-bold">
            <p>Estado:</p>
        </div>
        <div className="text-3xl text-c6 font-bold">
            <p>
                {getHtmlStatus()}
            </p>
        </div>
    </div>
}

export default Footer