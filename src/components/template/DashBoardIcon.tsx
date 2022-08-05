import Link from "next/link";

interface DashboardIconProps{
    icon: any;
    title: string;
    href: string;
}
export default function DashboardIcon(props:DashboardIconProps){
    return (
        <>
        <Link href={props.href}>
            <div className={`
            flex items-center justify-center py-10 px-10 m-5
            bg-gray-700 dark:text-gray-800 dark:bg-gray-100 rounded-md
            cursor-pointer text-gray-100 hover:bg-gray-600 
            `}>
                <span className={``}>{props.title}</span>
                <span className={`ml-1`}>{props.icon}</span>
            </div>
            </Link>
        </>
    )
}