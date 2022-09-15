interface ListaTiposProps{
    children:any; 
    className?:string;
}
export default function ListaTipos(props:ListaTiposProps){
    return (
        <ul className={`flex flex-col  w-full p-2 m-1 rounded-md items-center justify-start overflow-x-hidden overflow-y-scroll h-64`}>
            {props.children}
        </ul>
    )
}