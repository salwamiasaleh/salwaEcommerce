import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext(null)

export function CartContextProvider(props){
    let [cartitems,setcartitems]=useState([])
    async function getcartitems(){
        let headers={
            token:localStorage.getItem("token")
        }
        let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`,{headers})
        setcartitems(data)
        console.log(data);
    }
    async  function deletecartitem(id){
        let headers={
            token:localStorage.getItem("token")
        }
        let {data} = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,{headers})
        setcartitems(data)
        console.log(data);
    }
    async  function updatequantity(id,count){
        let headers={
            token:localStorage.getItem("token")
        }
        let body={
            count:count
        }
        let {data} = await axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,body,{headers})
        setcartitems(data)
        console.log(data);
    }
    
return  <CartContext.Provider value={{getcartitems,cartitems,deletecartitem,updatequantity}}>
    {props.children}
</CartContext.Provider>
}