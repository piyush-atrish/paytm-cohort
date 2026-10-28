import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signin = () => {
    const [ phone , setPhone ] = useState("");
    
    const [ password , setPassword ] = useState("");

        const navigate = useNavigate();

    const handleAuth = async () => {
    try {
      await axios.post("http://localhost:3000/api/v1/user/signin", {
        password: password,
        phone: phone
      },{withCredentials: true});

      alert("Sign in successful!");
      navigate("/dashboard");

    }catch (error) {
    
    if (axios.isAxiosError(error)) {
      
      const errorMessage = error.response?.data?.message || "Failed to sign in. Please check your details.";
      
      alert(errorMessage);
      
    } else {
      alert("An unexpected error occurred. Please try again.");
      console.error("Non-Axios error:", error);
    }
    
  }
  };

  return (
   
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-200/50 backdrop-blur-md">
      
      
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-6">
        
      
        <Heading label="Sign In" />

       
        <div className="flex flex-col gap-4">
          
          
          <InputBox 
            title="Phone Number" 
            placeholder="9999900000" 
            onchange = {(e)=>{
                setPhone(e.target.value)
            }}
          />
          
          <InputBox 
            title="Password" 
            placeholder="••••••••"
            onchange = {(e)=>{
                setPassword(e.target.value)
            }}
          />

          <Button 
          label="Signin"
          onClick={handleAuth}
          />
          
        </div>

      </div>
    </div>
  )
}