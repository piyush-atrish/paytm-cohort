import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const TransferExecute = () => {
  const [searchParams] = useSearchParams();
  const targetId = searchParams.get("to");
  const targetName = searchParams.get("name");
  
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");

  const handleTransfer = async () => {
    if (!targetId || !amount) return;
    
    try {
      await axios.post("http://localhost:3000/api/v1/user/account/transfer", {
        to: targetId,
        amount: amount
      }, { withCredentials: true });
      
      alert(`Successfully sent $${amount} to ${targetName}`);
      navigate("/transfer"); 
      
    } catch (error) {
      // 1. Check if the error came from our Express backend
      if (axios.isAxiosError(error)) {
        // Extract the custom message you sent from Express (fallback to a default if missing)
        const errorMessage = error.response?.data?.message || "Transfer failed due to an unknown error.";
        alert(errorMessage);
      } else {
        // Fallback for network errors (e.g., server is completely down)
        alert("An unexpected network error occurred.");
        console.error(error);
      }
    }
  };

  if (!targetId) return <div>Invalid transfer link.</div>;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-6 border border-slate-200">
      
      {/* NEW: Small Dashboard return button */}
      <button 
        onClick={() => navigate("/dashboard")}
        className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors self-start flex items-center gap-1"
      >
        &larr; Back to Dashboard
      </button>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">Send Money</h2>
        <p className="text-slate-500 mt-2 text-lg">{targetName}</p>
      </div>
      
      <input 
        type="number" 
        placeholder="Amount (in $)" 
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full px-4 py-3 text-center text-xl font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      
      <div className="flex gap-3 mt-4">
        <button onClick={() => navigate("/transfer")} className="w-1/3 py-3 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200">
          Cancel
        </button>
        <button onClick={handleTransfer} className="flex-1 py-3 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700">
          Initiate Transfer
        </button>
      </div>
    </div>
  );
};