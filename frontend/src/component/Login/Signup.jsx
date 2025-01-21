import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'



const Signup = () => {
    const [registerFormData, setregisterFormData] = useState({
        registerEmail:"" , registerName : ""  , registerPassword : "" ,
        registerUsername : ""
     })
     const [showPassword, setShowPassword] = useState(true)

  
     const register = async()=> {

        try {
           const response = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               } , 
               body: JSON.stringify({
                 name: registerFormData.registerName,
                 email: registerFormData.registerEmail,
                 password: registerFormData.registerPassword,
                  username: registerFormData.registerUsername,
  
             }),
           });
           const responseData = await response.json();
           if (response.status===200) {
               console.log("user created")
               console.log(responseData)
               
           }
           else {
              console.log(response.error)
           }
        }
        catch(error){
           console.log(error)
        }
     }
  
     const handleInputChange = (e) => {
  
  
  
        const { name, value } = e.target;
        setregisterFormData({
          ...registerFormData,
          [name]: value,
        });
      };
  
      const handleOnSumbit =async(e)=>{
  
        e.preventDefault()
        console.log(registerFormData)
        // await register()
        console.log(registerFormData)
      }
      return (
        <div className="min-h-screen bg-white">
          {/* Header */}
    
          {/* Form Container */}
          <main className="max-w-xl mx-auto mt-10 p-6 space-y-8 min-h-screen">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Create an account</h2>
              <p className="text-gray-600">
                Already a member?{' '}
                <Link to={"/"} className="text-[#6b21a8] hover:underline">
                  Log in
                </Link>
              </p>
            </div>
    
            <form className="space-y-6" onSubmit={handleOnSumbit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    onChange={handleInputChange}
                    name='registerName'
                    id="fullName"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#6b21a8] focus:border-[#6b21a8]"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    onChange={handleInputChange}
                    name='registerUsername'
                    id="username"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#6b21a8] focus:border-[#6b21a8]"
                  />
                </div>
              </div>
    
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-mail address
                </label>
                <input
                  onChange={handleInputChange}
                  name='registerEmail'
                  id="email"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#6b21a8] focus:border-[#6b21a8]"
                />
              </div>
    
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    onChange={handleInputChange}
                    name='registerPassword'
                    id="password"
                    type={showPassword ? "password" : "text"}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#6b21a8] focus:border-[#6b21a8]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
    
              <div className="flex items-center space-x-2">
                <input
                  onChange={handleInputChange}
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-[#6b21a8] focus:ring-[#6b21a8] border-gray-300 rounded"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember
                </label>
              </div>
    
              <button
                type="submit"
                className=" bg-black text-white py-2 px-4 rounded-md hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Create Account
              </button>
            </form>
          </main>
        </div>
      )
}

export default Signup