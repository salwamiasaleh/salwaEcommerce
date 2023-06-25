import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function Register() {
  let [errormessage,seterrormessage]=useState('')
  let [loadflag,setloadflag]=useState(true)
  let navigateto=useNavigate()
  
  let valid=Yup.object( 
  {
    name:Yup.string().required().min(3,"minimum of two characters").max(15,"maximum of fifteen characters"),
    email:Yup.string().email("enter a valid email").required(),
    phone: Yup.string().required().matches(/^(010|011|012|015)[0-9]{8}$/, "Enter valid phone number"),
    password: Yup.string().required().matches(/^[A-Z][a-zA-Z0-9!@#$%^&*()_-]{6,16}$/, "Invalid password: must begin with a capital letter and contain a number or a special character"),
    rePassword: Yup.string().required().oneOf([Yup.ref("password")], "passwords do not match")
 
  })


  let form=useFormik({
    initialValues:{   
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:""
   },onSubmit:(values)=>{
    sendregistrationdata(values)
   },validationSchema:valid
  })
async function sendregistrationdata(info){
  setloadflag(false)
  let {data}=await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`,info).catch((error)=>{
    console.log(error.response.data.message)
    setloadflag(true)
    seterrormessage(error.response.data.message)
  })
   if(data.message=="success"){
    setloadflag(true)
    navigateto("/salwaEcommerce")
   }
}
  return (
    <div>
  <h2 className='text-center '>Register Now</h2>
  <form onSubmit={form.handleSubmit}>
  <div className='my-3'>
    <label htmlFor="name">Name</label>
    <input onChange={form.handleChange} type="text" name="name" id="name"  className='form-control'/>
    <p className='text-danger'>{form.errors.name}</p>
  </div>
  <div className='my-3'>
    <label htmlFor="email">E-mail</label>
    <input onChange={form.handleChange} type="email" name="email" id="email"  className='form-control'/>
    <p className='text-danger'>{form.errors.email}</p>
  </div>
  <div className='my-3'>
    <label htmlFor="password">Password</label>
    <input onChange={form.handleChange} type="password" name="password" id="password"  className='form-control'/>
    <p className='text-danger'>{form.errors.password}</p>
  </div>
  <div className='my-3'>
    <label htmlFor="rePassword">Re-enter your password</label>
    <input onChange={form.handleChange} type="password" name="rePassword" id="rePassword"  className='form-control'/>
    <p className='text-danger'>{form.errors.rePassword}</p>
  </div>
  <div className='my-3'>
    <label htmlFor="phone">Phone number</label>
    <input onChange={form.handleChange} type="text" name="phone" id="phone"  className='form-control'/>
    <p className='text-danger'>{form.errors.phone}</p>
  </div>
  
{errormessage!=""?<div className='alert alert-danger'>{errormessage}</div>:<div></div>}
  {errormessage=""?<div></div>:""}
  {loadflag? <button disabled={!form.isValid} type='submit' className='btn btn-primary'>Submit</button>
 : <button   className='btn btn-primary'><i className='fa-solid fa-spinner fa-spin'></i></button>
}
  
  </form>

    </div>
  )
}
