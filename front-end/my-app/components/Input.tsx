interface InputProps {
  label: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function Input({ 
  label, 
  type, 
  value, 
  placeholder, 
  onChange, 
  required = false //# Se ninguém passar nada, o padrão é 'false'
}: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
  
      <input
        type={type}
        value={value}           // mostra o que está na variável 'value'
        required={required}
        placeholder={placeholder}
        
        onChange={(e) => onChange(e.target.value)}

        className="w-full rounded-md border border-gray-300 p-2.5 text-gray-900 
                   outline-none transition-all focus:border-blue-600 focus:ring-1 focus:ring-blue-600
                   placeholder:text-gray-400 shadow-sm"
      />
    </div>
  );
}