interface tipoItemProps {
  texto: string;
  id: any;
  className?: string;
  deleteMe: (id) => void;
}
export default function TipoItem(props: tipoItemProps) {
  return (
    <li
      className={`w-full  text-gray-700 text-sm md:text-md mb-2 ${props?.className}`}
    >
        <div className="flex w-full px-2 py-2 items-center justify-center">
        <span
        className={`
        bg-white hover:bg-gray-50 rounded-md py-2 px-2 w-2/3 mr-2
        `}
      >
        {props.texto}
      </span>{" "}
      <button
        onClick={props.deleteMe}
        className={`w-1/3 bg-red-500 hover:bg-red-400 text-white py-2 px-2 rounded-full`}
      >
        Deletar
      </button>
        </div>
    </li>
  );
}
