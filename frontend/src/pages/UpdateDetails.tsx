import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const UpdateDetails = () => {

    const [ firstName , setFirstName ] = useState("");

    const [ lastName , setLastName ] = useState("");

    const [ email , setEmail ] = useState("");

    const [ password , setPassword ] = useState("");

    const navigate = useNavigate();

   const handleAuth = async () => {
    try {
      // 1. Create an empty object to hold only the fields that changed
      const updatePayload: Record<string, string> = {};

      // 2. Only add fields to the payload if they are NOT empty strings
      if (firstName.trim() !== "") updatePayload.firstName = firstName;
      if (lastName.trim() !== "") updatePayload.lastName = lastName;
      if (email.trim() !== "") updatePayload.email = email;
      if (password.trim() !== "") updatePayload.password = password;

      // 3. Prevent sending an empty request if the user clicked update without typing anything
      if (Object.keys(updatePayload).length === 0) {
        alert("Please enter at least one field to update.");
        return; 
      }

      // 4. Send the cleaned payload
      await axios.patch(
        "http://localhost:3000/api/v1/user/update-profile", 
        updatePayload, 
        { withCredentials: true }
      );

      alert("Update successful!");
      navigate("/dashboard");

    } catch (error) {
       // ... your existing error handling ...
    }
  };

    return (
   
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-200/50 backdrop-blur-md">
      
      
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-6">
        
      
        <Heading label="Update Profile" />

       
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
              title="Password" 
              placeholder="••••••••" 
              onchange = {(e)=>{
                setPassword(e.target.value)
            }}
            />

            <Button label="Update the entered Fields" onClick={handleAuth}/>
          
        </div>

      </div>
    </div>
  )
}