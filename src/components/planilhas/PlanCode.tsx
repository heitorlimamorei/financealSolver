import { copyToClipBoard } from "../icons/Icones";

interface PlanCodeProps {
  code: string;
}
export default function PlanCode(props: PlanCodeProps) {
  function copyRoomCodeToClipBoard() {
    navigator.clipboard.writeText(props.code);
    const codeprops = props.code;
    alert(`Seu codico é: ${codeprops}`);
  }
  return (
    <button
      className={`
      flex items-center bg-white rounded-md cursor-pointer
       hover:bg-gray-100 py-2 px-2  border-2 border-gray-700
       font-bold mr-5
    `}
      onClick={copyRoomCodeToClipBoard}
    >
      <div className="items-center mr-1  h-full">{copyToClipBoard}</div>
      <span>Planilha #{props.code}</span>
    </button>
  );
}
