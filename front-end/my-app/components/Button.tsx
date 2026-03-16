interface ButtonProps {
    type?: "submit" | "reset" | "button";
    label: string;
}

export default function Button({
    type,
    label
}: ButtonProps){
    return (
        <button 
            className="w-full bg-blue-700 text-white py-2.5 rounded-md font-semibold 
                       hover:bg-blue-700 transition-colors shadow-md active:scale-95"
            type={type}
        >{label}</button>
    )
}

