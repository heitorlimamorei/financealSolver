import ComentarioOnFeed from "../../../model/ComentarioOnFeed"
import { checkIcon, starIcon, userAvatarDefault } from "../../icons/Icones"
import ProfileInput from "../ProfileInput"

interface ComentarioProps {
    comment: ComentarioOnFeed
}
export default function Comentario (props: ComentarioProps) {
    const { comment } = props
    return (
        <li className={`
        flex flex-col 
        py-4 px-5 m-2  bg-gradient-to-l from-gray-100 to-gray-700  dark:bg-gray-200 rounded-md w-full
        `}>
            <div>
            <span>
                <ProfileInput 
                valor={comment.text}
                tipo="string"
                disabled
                className="w-full"
                />
            </span>
            </div>
            <div className={`flex  items-center`}>
                <span className=" hidden md:flex m-2 text-gray-200" >{
                    comment.userImg.length > 5 ? (
                    <img src={comment.userImg} alt="UserImg" className={`rounded-full h-10 w-10`} />
                    ) : (
                       userAvatarDefault(8)
                    )
                }</span>
                <span className="m-2 text-gray-300 ">{comment.userName}</span>
                <span className="m-2 text-yellow-500 font-normal flex">{comment.classificacao} <span className="ml-1">{starIcon}</span></span>
                <span className="m-2 text-gray-700 font-semibold ">{comment.verificado ? checkIcon : 'não verificado'}</span>
            </div>
        </li>
    )
}