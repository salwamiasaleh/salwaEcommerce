import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import $ from 'jquery'
export default function Products() {
  let [productdetails,setproductdetails]=useState('')
  let {id}=useParams()
  console.log(id)
  let navigate = useNavigate()


  async function getproductdetails(){
    let {data}=await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
    console.log(data.data)
    setproductdetails(data.data)
   
  } 
  function images(image){
    // console.log(image.target.getAttribute( "src"))
     let imagepath=image.target.getAttribute( "src")
     $("#coverimg").attr("src",imagepath )
  }
  useEffect(()=>{
    getproductdetails()
  },[])
  async function addtocart(productId){
    let body={
      productId:id
    }
    let {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`,body,{
      headers:{
        token:localStorage.getItem("token"),
      }
    })
    if(data.status=='success'){
     //nav to cart details
     navigate('/cart')

    }
    console.log(data);
  }
  return (
    <div>

  
      {productdetails!=undefined?
      <div className="row align-items-center">
         <div className="col-md-4 col-sm-12">
          <img id='coverimg' src={productdetails.imageCover} className='w-100' alt="" />
        <div className="row">
        {productdetails.images?.map((element)=>{
          return   <img id='imageitem' onClick={images} src={element} className='col-md-2' alt="" />
        })}
        </div>
         </div>
        <div className='col-md-8 col-sm-12'>
          <h2>{productdetails.title}   </h2>
          <p className='text-muted'>{productdetails.description}</p>
          {/* <span className='text-success'>{productdetails.category.name}</span> */}
          <div className="d-flex justify-content-between">
            <p>{productdetails.price}EGP</p>
            <span>{productdetails.ratingsAverage}<i className='fa-solid fa-star text-warning'></i></span>
          </div>
          <button onClick={()=>addtocart(productdetails.id)}className='btn btn-secondary w-100'>Add to cart</button>
        </div>
      </div>:""}
    </div>
  )
}
