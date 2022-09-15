interface TableRow {
    className?: string;
    children: any;
}
export default function TableRow(props){
    return <tr className={`${props.className}`}>
        {props.children}
    </tr>
}