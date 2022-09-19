import { editIcon, trashIcon } from "../../icons/Icones";
import ProfileInput from "../../template/ProfileInput";

interface GastoMobileProps{
    className?: {
      editar: string;
      deletar: string;
    };
    children?: any;
    nome: string;
    tipo: string;
    valor: string;
    editar?: () => void;
    deletar?: () => void;
}
export default function GastoMobile(props:GastoMobileProps){
    return <li className={`flex w-full px-2 py-2  bg-white hover:bg-gray-50 text-gray-700 text-sm md:text-md mb-2 rounded-md`}>
         <div className="flex">
          <ProfileInput 
          valor={props.nome}
          disabled
          tipo="string"
          className="w-5/6"
          />
          <ProfileInput 
          valor={`R$${props.valor}`}
          disabled
          tipo="string"
          className="w-4/6"
          />
          <ProfileInput 
          valor={props.tipo}
          disabled
          tipo="string"
          className="w-3/6 hidden md:flex"
          />
      <button
        onClick={props.editar}
        className={`hover:text-green-400 w-1/6 hidden md:flex items-center rounded-ful ml-2 ${props.className?.editar} `}
      >
        {editIcon}
      </button>
      <button
        onClick={props.deletar}
        className={`hover:text-red-400 w-1/6 rounded-full mr-0 ${props.className?.deletar}`}
      >
        {trashIcon}
      </button>
         </div>
    </li>
}