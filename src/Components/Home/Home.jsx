import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import Slider from '../Slider/Slider'
import SecSlider from '../SecSlider/SecSlider'
export default function Home() {
  let [productlist,setproductlist]=useState([])
async function getallproducts(){
let {data}=await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`)
console.log(data)
setproductlist(data.data)
$(".loading").fadeOut(2000)
}
useEffect(()=>{
  getallproducts()
},[])
  return (
  <div className='position-relative'>
    <div className="loading position-fixed justify-content-center align-items-center  top-0 end-0 start-0 bottom-0">
<div>
  
<i className="fa-solid fa-spinner fa-spin fa-4x"></i>
</div>
    </div>
    <Slider/>
    <SecSlider/>
       <div className="row g-2">
     {productlist.map((element)=>{
      return <>
         <div key={element._id} className="col-md-2 col-sm-12 productitem">
          <Link to={"/products/"+element._id}>
        <div className="item">
          <img src={element.imageCover} className='w-100' alt="" />
          <span className='text-success'>{element.category.name}</span>
          <h2 className='h6 fw-bold'>{element.title.split(" ").slice(0,2).join(" ")}</h2>
          <div className="d-flex justify-content-between">
            <p>{element.price}EGP</p>
            <span>{element.ratingsAverage}<i className='fa-solid fa-star text-warning'></i></span>
          </div>
        </div>
        </Link>
        </div>
      </>
     })}
        </div> 
  </div>
  )
}
