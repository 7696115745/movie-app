import { Link } from "react-router";
import Api from "../hooks/Api";
import { useState } from "react";
import { useNavigate } from "react-router";
export default function Signup() {
  const Navigate=useNavigate()
   const [formData,setFormData]=useState({
    user_email:"",
    user_password:""
  })
  const handleSignup=async(e:any)=>{
    e.preventDefault()
  const hasEmpty = Object.values(formData).some(value => value.trim() === "");
    if(hasEmpty){
 return console.error("user can not be empty")
 
    }
try{
    const url =import.meta.env.VITE_PUBLIC_API_KEYS+`api/signup`;
  await Api('POST', url, {
  headers: {
    'Content-Type': 'application/json',
  },
  body:JSON.stringify(formData)
});
 alert("successfully created your Account")
Navigate("/")

 }
catch(error:any){
throw error;
}
  }
  const handleChange=(name:string,value:string)=>{
   setFormData((prvious:any)=>({
...prvious,
[name]:value
   }))
 
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        <form className="space-y-6" onSubmit={handleSignup}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={formData.user_email}
              placeholder="you@example.com"
              onChange={(e:any)=>handleChange("user_email",e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={formData.user_password}
               onChange={(e:any)=>handleChange("user_password",e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>

         <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
