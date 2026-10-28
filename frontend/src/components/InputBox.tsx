interface InputBoxProps {
  title: string;
  placeholder: string;
  onchange : (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({ title, placeholder , onchange }: InputBoxProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">
        {title}
      </label>
      <input 
        type="text" 
        placeholder={placeholder}
        onChange={onchange}
        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
      />
    </div>
  )
}

export default InputBox;