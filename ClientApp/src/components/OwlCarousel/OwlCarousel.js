import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export class Owldemo1 extends Component {
    render() {
        return (
            <div class='container-fluid' >
                <OwlCarousel 
                    className="owl-theme"
                    items={3} margin={8} autoplay={true} 
                >
                    <div ><img className="img" src={'/images/logo.png'} /></div>
                    <div ><img className="img" src={'/images/logo.png'} /></div>
                    <div ><img className="img" src={'/images/logo.png'} /></div>
                    <div ><img className="img" src={'/images/logo.png'} /></div>
                    <div ><img className="img" src={'/images/logo.png'} /></div>
                    <div ><img className="img" src={'/images/logo.png'} /></div>
                    <div ><img className="img" src={'/images/logo.png'} /></div>
                    <div ><img className="img" src={'/images/logo.png'} /></div>
                </OwlCarousel>
            </div>
        )
    }
}


export default Owldemo1;