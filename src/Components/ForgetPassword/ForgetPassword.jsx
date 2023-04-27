import { useFormik, Formik } from 'formik'
import React, { useState } from 'react'
import './ForgetPassword.css'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ForgetPassword() {
    let [errormessage, seterrormessage] = useState('')
    let [reseterrormessage, setreseterrormessage] = useState('')
    let[formflag,setformflag]=useState(true)
    let navigate=useNavigate()
    let validation = Yup.object({
        email: Yup.string().email("enter a valid email").required()
    })

    let resetform = useFormik({
        initialValues: {
            email: " "
        }, onSubmit: (values) => {
            forgetpasssend(values)
        }, validationSchema: validation
    })
///second form
    let resetcodeform = useFormik({
        initialValues: {
            resetCode: " "
        }, onSubmit: (values) => {
            resetpassword(values)
        }
    })
    async function forgetpasssend(values) {
        let { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords", values).catch((error) => {
            seterrormessage(error.response.data.message)
          
        })
        console.log(data)
         if(data.statusMsg=='success'){
             setformflag(false)
            //  {resetCode.innerHTML}=""
         }
    }

    async function resetpassword(values) {
        let { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode", values).catch((error)=>{
            setreseterrormessage(error.response.data.message)
        })
        console.log(data)
        if(data.status=="Success"){
            //go to resetpass
            navigate("/resetpassword")
        }
    }

    return (
        <>
        {formflag? <form onSubmit={resetform.handleSubmit} className='d-flex justify-content-center align-items-center flex-column ' id="resetform">
                <label htmlFor="email" className='py-2'>E-mail</label>
                <input onChange={resetform.handleChange} className="form-control py-2 w-100" type="email" id='email' name='email' />
                <p className='text-danger my-1'>{resetform.errors.email}</p>
                {errormessage ? <p className="text-danger">{errormessage}</p> : ""}

                <button type="submit" className='btn btn-dark my-3'>Send an E-mail</button>
            </form>: <form onSubmit={resetcodeform.handleSubmit} className='d-flex justify-content-center align-items-center flex-column ' id="resetform">
                <label htmlFor="resetCode" className='py-2'>Enter reset code</label>
                <input onChange={resetcodeform.handleChange} className="form-control py-2 w-100" type="text" id='resetCode' name='resetCode' />
                {reseterrormessage ? <p className="text-danger">{reseterrormessage}</p> : ""}

                <button type="submit" className='btn btn-dark my-3'>Reset</button> 
            </form>}
           

           
        </>
    )
}
