import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const DashBoard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // 1. Add state to track if details are visible
  const [showDetails, setShowDetails] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/data", {
          withCredentials: true
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/v1/user/logout", {}, {
        withCredentials: true
      });
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      navigate("/");
    }
  };

  const initial = userData?.firstName ? userData.firstName[0].toUpperCase() : "U";

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">Loading your dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* APP BAR */}
      <div className="bg-white px-8 py-4 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold border border-blue-200 shadow-sm">
            {initial}
          </div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Hi, {userData?.firstName || "User"}
          </h1>
        </div>
        <button 
          onClick={handleLogout}
          className="text-sm font-semibold text-slate-500 hover:text-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* DIVIDER LINE */}
      <div className="h-1 w-full bg-slate-200 shadow-sm mb-8"></div>

      {/* MAIN CONTENT */}
      <div className="px-8 flex flex-col gap-4">
        
        {/* 
          2. Conditional Rendering Block: 
          This entire div only exists in the DOM if showDetails is true 
        */}
        {showDetails && userData && (
          <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-2">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">Profile Details</h2>
            
            <div className="flex flex-col gap-3 text-slate-600">
              <p><span className="font-semibold text-slate-700">Name:</span> {userData.firstName} {userData.lastName}</p>
              <p><span className="font-semibold text-slate-700">Email:</span> {userData.email}</p>
              <p><span className="font-semibold text-slate-700">Phone:</span> {userData.phone}</p>
            </div>
          </div>
        )}

        {/* 3. The Buttons Container */}
        <div className="w-full max-w-xs flex flex-col gap-3">
          
          <div className="flex gap-2">
            {/* The main toggle button */}
            <div className="flex-1">
              <Button 
                label={showDetails ? "Hide Details" : "Show Profile Details"} 
                onClick={() => setShowDetails(!showDetails)} 
              />
            </div>

            {showDetails && (
              <div className="w-1/3">

                 <button 
                    onClick={() => navigate("/update-profile")}
                    className="w-full h-full bg-slate-100 text-slate-700 font-semibold py-2.5 rounded-lg hover:bg-slate-200 transition-colors active:scale-[0.98] border border-slate-300"
                 >
                    Edit
                 </button>
              </div>
            )}
          </div>
          
          <Button 
            label="Add Account" 
            onClick={() => console.log("Add Account Clicked")} 
          />
        </div>
      </div>

    </div>
  );
};