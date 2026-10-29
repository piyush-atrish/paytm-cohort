interface BoxProps {
  amount: number | string;
  title: string;
  // We accept specific Tailwind class strings for text and shadow
  textColorClass?: string; 
  shadowColorClass?: string; 
}

const Box = ({ 
  amount, 
  title, 
  textColorClass = "text-blue-600", 
  shadowColorClass = "shadow-blue-200" 
}: BoxProps) => {
  
  return (
    // The main square box
    <div className={`
      w-48 h-48 
      bg-white 
      rounded-2xl 
      shadow-lg ${shadowColorClass} 
      flex flex-col 
      p-4
      border border-slate-100
    `}>
      
      {/* 
        The Number Area: 
        flex-1 makes it take up all available vertical space, 
        pushing the title to the very bottom.
      */}
      <div className="flex-1 flex items-center justify-center">
        <span className={`text-4xl font-bold truncate px-2 ${textColorClass}`}>
           ₹{amount}
        </span>
      </div>
      
      {/* 
        The Title Area: 
        Sits at the bottom of the square.
      */}
      <div className={`text-center text-sm font-semibold pb-1 ${textColorClass}`}>
        {title}
      </div>
      
    </div>
  );
};

export default Box;