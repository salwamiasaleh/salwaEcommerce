import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function ResetPassword() {
 const [errormsg,seterrormsg]=useState('')
 const [loadflag,setloadflag]=useState(true)
 let nav=useNavigate()

 let valid= Yup.object({
  email:Yup.string().email("enter a valid email").required(),
  newPassword:Yup.string().required().matches(/^[A-Z][a-zA-Z0-9!@#$%^&*()_-]{6,16}$/,"Invalid password: must begin with a capital letter and contain a number or a special character")
 })
 let resetform=useFormik({
  initialValues:{
    email:"",
    newPassword:""
  },onSubmit:(values)=>{
    resetpassworddetails(values)
  },validationSchema:valid
 })

 async function resetpassworddetails(vals){
  setloadflag(false)
let {data}=await axios.put("https://route-ecommerce.onrender.com/api/v1/auth/resetPassword",vals).catch((error)=>{
console.log(error.response.data.message)
setloadflag(true)
seterrormsg(error.response.data.message)

})
console.log(data)
if(data.token!=null){
 //////

  setloadflag(true)
  nav('/login')
}


}
  return (
    <>
    <h2 className='text-center'>Reset Password </h2>
  <form onSubmit={resetform.handleSubmit}>
  <div className='my-3'>  
  <label htmlFor="email">E-mail</label>
  <input type="text" id='email' name='email' onChange={resetform.handleChange} className='form-control' />
  <p className='text-danger'>{resetform.errors.email}</p>
  </div>
  <div className='my-3'>  
  <label htmlFor="newPassword">Password</label>
  <input type="password" id='newPassword' name='newPassword' onChange={resetform.handleChange} className='form-control' />
  <p className='text-danger'>{resetform.errors.password}</p>
  </div>
 
  
  <br/>
    {errormsg?  <div className="alert alert-danger"> {errormsg}</div>:""}
{loadflag? <button disabled={!resetform.isValid} type="submit" className='btn btn-primary my-2'>Update</button>
 : <button   className='btn btn-primary'><i className='fa-solid fa-spinner fa-spin my-2'></i></button>}

</form>
    </>
  )
}
