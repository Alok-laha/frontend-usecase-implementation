
const Button = ({text, onClick, type}: {text: string, onClick: (type:number)=> void, type:number}) => {
    return <button style={{marginLeft: "5px"}} onClick={()=>onClick(type)}>{text}</button>
}


export default Button;