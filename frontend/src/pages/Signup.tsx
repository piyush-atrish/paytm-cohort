import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const Signup = () => {

    const [ firstName , setFirstName ] = useState("");

    const [ lastName , setLastName ] = useState("");

    const [ email , setEmail ] = useState("");

    const [ phone , setPhone ] = useState("");

    const [ password , setPassword ] = useState("");

    const navigate = useNavigate();

    const handleAuth = async () => {
    try {
        await axios.post("http://localhost:3000/api/v1/user/signup", {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phone: phone
      });

      alert("Sign up successful!");
      navigate("/signin");

    }catch (error) {
    
    if (axios.isAxiosError(error)) {
      
      const errorMessage = error.response?.data?.message || "Failed to sign up. Please check your details.";
      
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
        
      
        <Heading label="Sign Up" />

       
        <div className="flex flex-col gap-4">
          
            <InputBox 
            title="First Name" 
            placeholder="George" 
            onchange = {(e)=>{
                setFirstName(e.target.value)
            }}
            />

            <InputBox 
            title="Last Name" 
            placeholder="Orwell" 
            onchange = {(e)=>{
                setLastName(e.target.value)
            }}
            />

            <InputBox 
            title="E-mail" 
            placeholder="your@email.com" 
            onchange = {(e)=>{
                setEmail(e.target.value)
            }}
            />

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

            <Button label="Signup" onClick={handleAuth}/>
          
        </div>

      </div>
    </div>
  )
}