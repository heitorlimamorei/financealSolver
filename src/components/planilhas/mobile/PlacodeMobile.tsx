import { copyToClipBoard } from "../../icons/Icones";

interface PlanCodeMobile{
    className?:string;
    code: string;

}
export default function PlanCodeMobile(props:PlanCodeMobile){
    function copyRoomCodeToClipBoard() {
        navigator.clipboard.writeText(props.code);
        const codeprops = props.code;
        alert(`Seu codico é: ${codeprops}`);
      }
    return <span onClick={copyRoomCodeToClipBoard} className={`flex ${props.className} h-10 w-12 bg-gray-100 rounded-3xl items-center justify-center hover:text-red-600`}>
        {copyToClipBoard}
    </span>
}