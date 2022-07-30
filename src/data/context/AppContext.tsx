import { createContext, useState, useEffect} from "react";
import FinProfileModel from "../../model/FinProfileModel";

interface AppContextProps {
    finProfile: FinProfileModel
    tema: string;
    alternarTema: () => void;
    newFinProfile: (profile: FinProfileModel) => void
}
type AppContextProvider = {
    children:any
}
const finProfileMock = FinProfileModel.getWhiteProfile()

const AppContext = createContext<AppContextProps>({
    finProfile: finProfileMock,
    tema:"",
    alternarTema:null,
    newFinProfile: null
})


export function AppContextProvider(props:AppContextProvider){
    const [tema, setTema] = useState('')
    const [finProfile, setFinProfile] = useState(finProfileMock)
    function alternarTema(){
        const novoTema = tema === 'dark' ? '' : 'dark'
        setTema(novoTema)
        localStorage.setItem('tema', novoTema)
    }
    function newFinProfile(profile:FinProfileModel){
        setFinProfile(profile)
    }
    useEffect(() =>{
        const tema = localStorage.getItem('tema')
        setTema(tema)
    }, [])
    return (
        <AppContext.Provider value={{
            finProfile,
            tema,
            alternarTema,
            newFinProfile
        }}>
            {props.children}
        </AppContext.Provider>
    )
}



export default AppContext