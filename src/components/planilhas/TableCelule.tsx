interface TableCeluleProps{
    texto: string;
    className?: string;
    children?:any
}
export default function TableCelule(props:TableCeluleProps){
    return <td className={`border-2 border-gray-700 p2 ${props.className}`}>
        {props.texto}
        {props.children}
    </td>
}