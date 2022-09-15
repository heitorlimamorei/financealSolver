import Titulo from './Titulo'
import BotaoTema from './BotaoTema'
import useAppData from '../../data/hook/useAppData';
import Avatar from './AvatarUsuario';
import Link from 'next/link';
interface CabecalhoProps {
    titulo: string;
    subtitulo: string;
    children?: any;
    feedBack?: boolean;
}
export default function Cabecalho(props:CabecalhoProps){
    const {tema, alternarTema} = useAppData()
    return (
        <div className={`flex`}>
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo}/>
            <div className="justify-start">
                {props?.children}
            </div>
            <div className={`flex flex-grow justify-end items-center`}>
                {props?.feedBack ? (
                 <Link href="/CommentsFeed" >                 
                 <button className={`hidden sm:flex items-center  cursor-pointer
                 bg-gradient-to-r from-white to-gray-800 text-gray-800
                   px-5 py-1 rounded-full
                 `}>Mostrar Feed</button>
                 </Link>
                ) : false }
                <BotaoTema tema={tema} alternarTema={alternarTema}/>
                <Avatar />
            </div>
        </div>
    )
}