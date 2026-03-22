interface ButtonProps {
    type?: "submit" | "reset" | "button";
    label: string;
    className?: string;
    onClick?: ()=> void;
}

export default function Button({
    type,
    label,
    className= "",
    onClick
}: ButtonProps){
    const baseStyle= "w-full py-2.5 rounded-xl font-bold transition-all active:scale-95 shadow-md flex justify-center items-center";
    const defaultColor = className.includes('bg-') 
        ? "" 
        : "bg-blue-700 hover:bg-blue-800 text-white"
    return (
        <button 
            className= {`${baseStyle} ${defaultColor} ${className}`}
            type={type}
            onClick={onClick}
        >{label}</button>
    )
}

