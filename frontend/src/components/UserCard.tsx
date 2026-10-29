import { useNavigate } from "react-router-dom";

interface UserCardProps {
  firstName: string;
  lastName: string;
  phone: string;
  _id: string;
}

export const UserCard = ({ firstName, lastName, phone, _id }: UserCardProps) => {
  const navigate = useNavigate();

  // 1. Get the first initial
  const initial = firstName ? firstName[0].toUpperCase() : "U";

  // 2. Generate a consistent random color based on the name length
  const colors = [
    "bg-red-100 text-red-600",
    "bg-blue-100 text-blue-600",
    "bg-green-100 text-green-600",
    "bg-purple-100 text-purple-600",
    "bg-yellow-100 text-yellow-600",
    "bg-pink-100 text-pink-600",
    "bg-indigo-100 text-indigo-600"
  ];
  
  // A simple trick to pick a consistent color without a complex hashing function
  const colorIndex = (firstName.length + lastName.length) % colors.length;
  const selectedColor = colors[colorIndex];

  // 3. The Add/Send Handler
  const handleAction = () => {
    // When clicked, we route to the transfer page and pass the user's ID and Name in the URL query params!
    // Example: /transfer?to=12345&name=George
   navigate(`/transfer/execute?to=${_id}&name=${firstName}+${lastName}`);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      
      {/* LEFT SIDE: Avatar + Info */}
      <div className="flex items-center gap-4">
        
        {/* The Circular Avatar */}
        <div className={`h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold ${selectedColor}`}>
          {initial}
        </div>
        
        {/* Name and Phone Number */}
        <div className="flex flex-col">
          <span className="font-bold text-slate-800 text-lg">
            {firstName} {lastName}
          </span>
          <span className="text-sm font-medium text-slate-500">
            {phone}
          </span>
        </div>

      </div>

      {/* RIGHT SIDE: Action Button */}
      <div>
        <button 
          onClick={handleAction}
          className="px-5 py-2 bg-slate-800 text-white font-semibold text-sm rounded-lg hover:bg-slate-700 active:scale-95 transition-all"
        >
          Send Money
        </button>
      </div>

    </div>
  );
};