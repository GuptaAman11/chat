import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'



const Signup = () => {
    const [registerFormData, setregisterFormData] = useState({
        registerEmail:"" , registerName : ""  , registerPassword : ""
     })
  
     const register = async()=> {
  
        
    
        try {
           const response = await fetch(`http://localhost:8000/api/v1/users/register`, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               } , 
               body: JSON.stringify({
                 name: registerFormData.registerName,
                 email: registerFormData.registerEmail,
                 password: registerFormData.registerPassword,
  
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
        await register()
        console.log(registerFormData)
      }
  return (
    <div class="min-h-screen flex items-center justify-center bg-purple-700">
    <div class="bg-purple-100 w-4/5 rounded-lg p-5 flex">
      <div class="w-1/2">
        <img src="https://image.freepik.com/free-vector/login-concept-illustration_114360-739.jpg" alt="img" class="h-full w-full object-cover" />
      </div>
      <div class="w-1/2 p-5">
        <h1 class="text-2xl font-bold text-blue-500 mb-4">Login</h1>
        <form action="" onSubmit={handleOnSumbit}>
          <label for="Username">Username</label>
          <div class="mb-4">
            <input type="text" placeholder="Username" name="registerName"onChange={handleInputChange} class="w-full px-3 py-2 border rounded-lg" />
          </div>
          <label for="email">Email</label>
          <div class="mb-4">
            <input type="text" placeholder="Email" name="registerEmail"onChange={handleInputChange} class="w-full px-3 py-2 border rounded-lg" />
          </div>
          <label for="password">Password</label>
          <div class="mb-4">
            <input type="password" placeholder="Password" name="registerPassword"onChange={handleInputChange} class="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div class="mb-4">
            <button type="submit" class="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none">Submit</button>
          </div>
        </form>
        <Link to={'/login'}>
        <p> <a href="#">Click here for Login</a></p>

        </Link>
      </div>
    </div>
  </div>



  )
}

export default Signup