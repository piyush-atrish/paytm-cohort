import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import Box from "../components/Box";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface AccountDetail {
  balance: string;
  transfered: string;
  received: string;
}

export const DashBoard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [accountDetails, setAccountDetails] = useState<AccountDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Toggles for UI states
  const [showDetails, setShowDetails] = useState(false);
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [showAddAccountForm, setShowAddAccountForm] = useState(false);
  
  // States for Add Account inputs
  const [balance, setBalance] = useState("");

  const navigate = useNavigate();

  // 1. Fetch User Profile
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/user/data?t=${new Date().getTime()}`, {
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

  // 2. Fetch Account Balances

  const fetchAccountDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/account/details", {
          withCredentials: true
        });
        setAccountDetails(response.data);
        setShowAccountDetails(true);
      } catch (error) {
        console.error("Failed to fetch account details", error);
      }
    };

  useEffect(() => {
    fetchAccountDetails();
  }, []);

  // 3. Handlers
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/v1/user/logout", {}, {
        withCredentials: true
      });
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleAddAccountSubmit = async () => {
    try{
        console.log("Submitting:", { balance });
        await axios.post("http://localhost:3000/api/v1/user/account/add-account", {balance}, {
        withCredentials: true
        });
        alert("Account linking simulated!");
        setShowAddAccountForm(false);
        await fetchAccountDetails();
    }
    catch (error) {
      console.error("adding bank account failed", error);
    }
  };

  const initial = userData?.firstName ? userData.firstName[0].toUpperCase() : "U";

  // Loading State
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
        
        {/* 1. Profile Details Box (Conditional) */}
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

        {/* 2. Action Buttons OR Add Account Form (Mutually Exclusive) */}
        {showAddAccountForm ? (
          
          /* The Add Account Form */
          <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-slate-800">Link New Bank Account</h2>
            
            <InputBox 
              title="Balance" 
              placeholder="9999" 
              onchange={(e) => setBalance(e.target.value)}
            />

            
            <div className="flex gap-2 mt-2">
              <div className="w-1/3">
                <button 
                  onClick={() => setShowAddAccountForm(false)}
                  className="w-full h-full bg-white text-slate-600 font-semibold py-2.5 rounded-lg hover:bg-slate-50 transition-colors active:scale-[0.98] border border-slate-300"
                >
                  Cancel
                </button>
              </div>
              <div className="flex-1">
                <Button label="Submit Details" onClick={handleAddAccountSubmit} />
              </div>
            </div>
          <h1>The account link feature is set to manually adding balance instead of adding an API - to focus on building the app as it is just to practice the building of application and avoid complexity for a small project , i can add functionality to this feature in future.</h1>
          </div>

        ) : (

          /* The Default Action Buttons */
          <div className="w-full max-w-xs flex flex-col gap-3">
            <div className="flex gap-2">
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
            
            {/* Show Add Account Button only if they haven't added an account yet */}
            {!showAccountDetails && (
              <Button 
                label="Add Account" 
                onClick={() => setShowAddAccountForm(true)} 
              />
            )}
          </div>
        )}

        {/* 3. Account Balances Section (Horizontal Layout) */}
        {showAccountDetails && accountDetails && !showAddAccountForm && (
          <div className="w-full max-w-2xl flex flex-wrap gap-6 mt-4">
            <Box 
              amount={accountDetails.balance} 
              title="Balance" 
              textColorClass="text-blue-400" 
              shadowColorClass="shadow-blue-200" 
            />
            <Box 
              amount={accountDetails.transfered} 
              title="Transferred"  
              textColorClass="text-orange-600" 
              shadowColorClass="shadow-orange-200" 
            />
            <Box 
              amount={accountDetails.received} 
              title="Received" 
              textColorClass="text-green-600" 
              shadowColorClass="shadow-green-200" 
            />
          <Button label="Tranfer Money" onClick={() => navigate("/transfer")}/>
          </div>
        )}

      </div>
    </div>
  );
};