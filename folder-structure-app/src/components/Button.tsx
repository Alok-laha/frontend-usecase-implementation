
const Button = ({text, onClick, type, action}: {text: string, onClick: (type:number, action?: string)=> void, type:number, action?: string}) => {
    return <button style={{marginLeft: "5px"}} onClick={()=>onClick(type, action)}>{text}</button>
}


export default Button;