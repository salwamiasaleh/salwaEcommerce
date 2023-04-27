import React from 'react'
import firstimg from '../../Assets/slider-image-1.jpeg'
import secondimg from '../../Assets/slider-image-2.jpeg'
import thirdimg from '../../Assets/slider-image-3.jpeg'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function Slider() {
  return (
    <div>
        <div className="row g-0 my-5">
            <div className="col-md-9 col-sm-12">
        <OwlCarousel className='owl-theme' items={1} loop margin={10}>
    
    <img src={firstimg} className='w-100' height={400} alt="" />
    <img src={secondimg} className='w-100' height={200} alt="" />
    <img src={thirdimg}  className='w-100' height={200} alt="" />

   

</OwlCarousel>; 
        
              
            </div>
            <div className="col-md-3 col-sm-12">
                <img src={secondimg} className='w-100' height={200} alt="" />
                <img src={thirdimg}  className='w-100' height={200} alt="" />
            </div>
        </div>
    </div>
  )
}
