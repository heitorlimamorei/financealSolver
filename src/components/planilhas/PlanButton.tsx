interface PlanButtonProps{
    texto:string;
    onClick: () => void;
    className?: string;
    children?:any;
}
export default function PlanButton(props:PlanButtonProps){
    return <button className={` m-1 py-2 px-6 text-white text-center rounded-full ${props.className}`} onClick={props.onClick}>
        {props.texto}
        {props.children}
    </button>
}