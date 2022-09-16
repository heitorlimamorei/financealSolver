import { trashIcon } from "../icons/Icones";
import ProfileInput from "../template/ProfileInput";

interface tipoItemProps {
  texto: string;
  id: any;
  className?: string;
  deleteMe: (id) => void;
}
export default function TipoItem(props: tipoItemProps) {
  return (
    <li
      className={`flex w-full px-2 py-2  bg-white hover:bg-gray-50 text-gray-700 text-sm md:text-md mb-2 rounded-md ${props?.className}`}
    >
        <div className="flex">
          <ProfileInput 
          valor={props.texto}
          disabled
          tipo="string"
          className="w-2/3"
          />
      <button
        onClick={props.deleteMe}
        className={`hover:text-red-400 ml-10 rounded-full`}
      >
       {trashIcon}
      </button>
        </div>
    </li>
  );
}
