import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export let CategoryContext = createContext(null)

export function CategoryContextProvider(props){
   let  [listofcategories,setlistofcategories]=useState([])

    async function getcategories(){
        let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`).catch((err)=>{
            console.log(err);
      
        })
        setlistofcategories(data.data)
    }
    useEffect(()=>{
        
        getcategories()
    },[])
return <CategoryContext.Provider value={{listofcategories}}>
    {props.children}
</CategoryContext.Provider>
}