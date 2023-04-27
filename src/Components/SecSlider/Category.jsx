import React, { useContext } from 'react'
import { CategoryContext } from '../../SharedData/CategoryContext'

export default function Category() {
    let {listofcategories} = useContext(CategoryContext)
    console.log(listofcategories)
  return (
    <div>
        <div className="row">
        {listofcategories.map((el,i)=>{
            return    <div key={i} className="col-md-6 col-sm-12">

            <div className="border">
                <img src={el.image} height={400} className='w-100' alt="" />
                <h6>{el.name}</h6>
            </div>
        </div>
        })}
        </div>
    </div>
  )
}
