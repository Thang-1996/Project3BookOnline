import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export class SliderHome extends Component {
    render() {
        return (
            <div className='container-fluid' >
                <OwlCarousel
                    className="owl-theme"
                    items={1}  autoplay={true}
                >
                    <div ><img className="img" src={'/images/logo.png'} /></div>
                    <div ><img className="img" src={'/images/logo.png'} /></div>
                    <div ><img className="img" src={'/images/logo.png'} /></div>
                    <div ><img className="img" src={'/images/logo.png'} /></div>
                </OwlCarousel>
            </div>
        )
    }
}


export default SliderHome;