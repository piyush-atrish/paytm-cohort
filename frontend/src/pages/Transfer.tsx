import { useState, useEffect } from "react";
import axios from "axios";
import { Outlet, useLocation , useNavigate} from "react-router-dom";
import { UserCard } from "../components/UserCard"; 
import Heading from "../components/Heading"; 

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export const Transfer = () => {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const location = useLocation();
  
  const [isLoading, setIsLoading] = useState(false);

  const isExecutingTransfer = location.pathname.includes("/execute")

  const navigate = useNavigate();

  useEffect(() => {

    setIsLoading(true);

    const timer = setTimeout(() => {
            const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
          withCredentials: true
        });
         
        setUsers(response.data || []);
        console.log("requestt sent")
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
    }, 500);

    return () => {
      clearTimeout(timer);
    };

  }, [filter]); 

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center p-8">
      
      {/* Main Container */}
      <div className={`w-full max-w-2xl flex flex-col gap-6 transition-opacity ${isExecutingTransfer ? 'opacity-30 pointer-events-none' : ''}`}>
        <button 
            onClick={() => navigate("/dashboard")}
            className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors self-start"
        >
            &larr; Back to Dashboard
        </button>
        <Heading label="Send Money" />

        {/* The Search Bar */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search users by name..." 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-slate-700"
          />
        </div>

        {/* The Users List Container */}
        <div className="flex flex-col gap-3">
          
          {isLoading && users.length === 0 && (
            <div className="text-center text-slate-500 py-4">Searching...</div>
          )}

          {!isLoading && users.length === 0 && (
            <div className="text-center text-slate-500 py-4">No users found.</div>
          )}

          {/* Map over the users array and render a UserCard for each one */}
          {users.map((user) => (
            <UserCard 
              key={user._id} // Required by React when mapping
              _id={user._id}
              firstName={user.firstName}
              lastName={user.lastName}
              phone={user.phone}
            />
          ))}
          
        </div>

      </div>
      {isExecutingTransfer && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/10 backdrop-blur-sm z-50">
          <Outlet /> 
        </div>
        )}
    </div>
  );
};