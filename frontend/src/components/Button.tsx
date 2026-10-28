interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button = ({ label, onClick, type = "button" }: ButtonProps) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors active:scale-[0.98]"
    >
      {label}
    </button>
  )
}

export default Button;