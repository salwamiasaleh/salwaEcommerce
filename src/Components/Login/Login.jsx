import axios from 'axios'
import { useFormik } from 'formik'

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
//


export default function Login({saveuser}) {
  
  const [errormsg,seterrormsg]=useState('')
  const [loadflag,setloadflag]=useState(true)
  let nav=useNavigate()
  
  let valid= Yup.object({
    email:Yup.string().email("enter a valid email").required(),
    password:Yup.string().required().matches(/^[A-Z][a-zA-Z0-9!@#$%^&*()_-]{6,16}$/,"Invalid password: must begin with a capital letter and contain a number or a special character")  
  })
  
  
    let loginform=useFormik({
    initialValues:{
      email:"",
      password:""
    },onSubmit:(vals)=>{
      logindetails(vals)
    },validationSchema:valid
  })
  async function logindetails(vals){
    setloadflag(false)
   let {data}= await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signin", vals).catch((error)=>{
     console.log(error.response.data.message)
     setloadflag(true)
     seterrormsg(error.response.data.message)
  //  console.log(error)
   })
   if(data.message=="success"){
    //////
    saveuser(data.user)
    localStorage.setItem("token",data.token)
    setloadflag(true)
    nav('/home')
   }
  
  }
  return (
<>
  <h2 className='text-center'>Login </h2>
  <form onSubmit={loginform.handleSubmit}>
  <div className='my-3'>  
  <label htmlFor="email">E-mail</label>
  <input type="text" id='email' name='email' onChange={loginform.handleChange} className='form-control' />
  <p className='text-danger'>{loginform.errors.email}</p>
  </div>
  <div className='my-3'>  
  <label htmlFor="password">Password</label>
  <input type="password" id='password' name='password' onChange={loginform.handleChange} className='form-control' />
  <p className='text-danger'>{loginform.errors.password}</p>
  </div>
 
  <Link to="/ForgetPassword">Rest Password</Link>
  <br/>
    {errormsg?  <div className="alert alert-danger"> {errormsg}</div>:""}
{loadflag? <button disabled={!loginform.isValid} type="submit" className='btn btn-primary my-2'>Login</button>
 : <button   className='btn btn-primary'><i className='fa-solid fa-spinner fa-spin my-2'></i></button>}

</form>
</>
  )
}
