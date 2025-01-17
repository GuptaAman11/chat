import React, { useState } from 'react'
import {Link, NavLink,useNavigate} from 'react-router-dom'


const Login = () => {
    const [user,setUser] = useState("");
    const navigate = useNavigate()
    const [loginData , setloginData] = useState({
        loginEmail : "" , loginPassword:""
    })

    const login =async()=>{
       try {
         const response = await fetch(`http://localhost:8000/api/v1/users/login` ,{
             method : 'POST',
             headers : {
                 'Content-Type' : 'application/json'
             },
 
             body: JSON.stringify({
                 
                 email: loginData.loginEmail,
                 password: loginData.loginPassword,
             }),
 
         })
         const responseData = await response.json();
         if (response.ok) {
            setUser(responseData)
            navigate('/home')
             localStorage.setItem('token',responseData.token)
         }
         else {
             alert(responseData.msg)
         }
      }
       
       catch (error) {
        console.log(error)
        
       }

    
        
        
    }



    const handleInputForm =(e)=> {

        const {name , value} = e.target ; 
        setloginData({
            ...loginData , 
            [name] : value
        })

        
    }
    const handleOnSubmit= async(e)=>{
        e.preventDefault();
        await login()
        
        console.log(loginData)

    }
        

    

  return (
 
    <div class="min-h-screen flex items-center justify-center bg-purple-700">
    <div class="bg-purple-100 w-4/5 rounded-lg p-5 flex">
      <div class="w-1/2">
        <img src="https://image.freepik.com/free-vector/login-concept-illustration_114360-739.jpg" alt="img" class="h-full w-full object-cover" />
      </div>
      <div class="w-1/2 p-5">
        <h1 class="text-2xl font-bold text-blue-500 mb-4">Login</h1>
        <form action="" onSubmit={handleOnSubmit}>
          <label for="email">Email</label>
          <div class="mb-4">
            <input type="text" placeholder="Email" name="loginEmail" required onChange={handleInputForm} class="w-full px-3 py-2 border rounded-lg" />
          </div>
          <label for="password">Password</label>
          <div class="mb-4">
            <input type="password" placeholder="Password" name="loginPassword" required onChange={handleInputForm} class="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div class="mb-4">
            <button type="submit" class="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none">Submit</button>
          </div>
        </form>
        <Link to={'/signup'}>
        <p>Not a member? <a href="#">Click here for Registration</a></p>

        </Link>
      </div>
    </div>
  </div>
      
    
  )
}

export default Login