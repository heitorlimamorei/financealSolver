import MenuItem from "./MenuItem";
import {IconeAjustes, IconeCasa, IconeSino, IconeSair, FeedBack, table} from '../icons/Icones'
import Logo from "./Logo";
import useAuth from "../../data/hook/useAuth";

export default function MenuLateral(props){
    const { logout } = useAuth()
    return(
        <aside  className={`
        flex flex-col
        bg-gray-200 text-gray-700
        dark:bg-gray-900 dark:text-gray-200
        `}>
            <div className={`
            flex flex-col items-center justify-center 
            bg-gradient-to-r from-indigo-500 to-purple-800
            h-20 w-20
        
            `}>
                <Logo />
            </div>
            <ul className={`flex-grow`}>
                <MenuItem titulo="Home" url="/" icone={IconeCasa} />
                <MenuItem titulo="Planilhas" url="/planilhas" icone={table(6, 6)} />
                <MenuItem titulo="FeedBack" url="/FeedBack" icone={FeedBack} />
            </ul>
            <ul className={``}>
            <MenuItem titulo="Sair"  icone={IconeSair} onClick={logout} className={`
            text-red-600
            hover:bg-red-400 hover:text-white
            `}/>
            </ul>
        </aside>
    )
}