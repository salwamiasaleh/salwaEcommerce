import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../SharedData/CartContext'

export default function CartDetails() {
    let {getcartitems,cartitems,deletecartitem,updatequantity} =useContext(CartContext)
    useEffect(()=>{
        getcartitems()
    },[])
   console.log(cartitems);
  return (
    <div>
        {cartitems?
           <table style={{verticalAlign:'middle'}} className='table table-stiped table-border text-center my-3'>
           <thead>
               <tr>
                   <th>IMAGE</th>
                   <th>NAME</th>
                   <th>PRICE</th>
                   <th>QUANTITY</th>
                   <th>UPDATES</th>
               </tr>
           </thead>
           <tbody>
               {cartitems.data?.products.map((el)=>{
                return <tr>
                <td><img src={el.product.imageCover} height={100} className='w-100' alt="" /></td>
                <td>{el.product.title}</td>
                <td>{el.price} EGP</td>
                <td className='d-flex justify-content-center align-items-center 'height={155} >
                    <p>{el.count}</p> 
                   <div className='d-flex justify-content-center flex-column'>
                   <button onClick={()=>{updatequantity(el.product._id,el.count-=1)}} style={{cursor:'pointer'}} className="btn btn-danger rounded">-</button>
                    <button onClick={()=>{updatequantity(el.product._id,el.count+=1)}} style={{cursor:'pointer'}} className="btn btn-info rounded">+</button>
                   
                   </div>
                </td>
                <td>
                    <i style={{cursor:'pointer'}} onClick={()=>{deletecartitem(el.product._id)}}className='fa-solid fa-trash text-danger'></i>
                </td>
            </tr>
     
                
               })}
            <tr>
                <td colSpan={4}>Total</td>
                <td>{cartitems.data?.totalCartPrice}</td>
            </tr>
           </tbody>
       </table>
        :""}
     
    </div>
  )
}
