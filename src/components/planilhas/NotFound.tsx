import Link from "next/link";
import { MsgErrorIcon } from "../icons/Icones";
interface NotFoundErrorProps {
    msg: string;
    statusErro: string;
    routes: {
        routeOne?: string;
        routeTwo?: string;
    }
    routeMsg: {
        msgOne?: string;
        msgTwo?: string;
    }
}
export default function NotFund(props:NotFoundErrorProps) {
  return (
    <div className={`flex mt-1 h-full flex-col w-full items-center justify-center`}>
      <div
        className={`flex h-full flex-col items-center justify-center bg-gray-100 rounded-md px-4 py-6`}
      >
        <div className={`flex items-center justify-center`}>
          <span className={`text-red-700`}>{MsgErrorIcon(12)}</span>
          <h1>
            <span className="text-gray-800">Erro: {props.statusErro}</span> : {props.msg}
          </h1>
        </div>
        <div
          className={` items-center justify-center w-full cursor-pointer hidden md:flex`}
        >
          <Link href={props.routes.routeOne}>
            <h3 className="hover:text-green-700 mr-1">{props.routeMsg.msgOne}</h3>
          </Link>
          <Link href={props.routes.routeTwo}>
            <h3 className="hover:text-green-700 cursor-pointer">{props.routeMsg.msgTwo}</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}
