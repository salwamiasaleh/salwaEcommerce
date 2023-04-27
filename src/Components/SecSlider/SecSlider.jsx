import React, { useContext } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { CategoryContext } from '../../SharedData/CategoryContext';
export default function SecSlider() {
    let {listofcategories}=useContext(CategoryContext)
    return (
        <div>
            <OwlCarousel className='owl-theme' items={7} dots={false} loop margin={10}>

            {listofcategories.map((el,i)=>{
            return    <div key={i} >

      
                <img src={el.image}className='w-100' height={200}alt="" />
    
        </div>
        })}

            </OwlCarousel>;

        </div>
    )
}
