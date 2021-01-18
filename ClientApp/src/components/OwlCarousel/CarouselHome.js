import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import API from '../API';
import Adapter from '../Adapter';
import { Link } from 'react-router-dom';
export default class CarouselHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: props.products,
        };
    }
    render() {
        const { products } = this.state;
        return (
            <div className='container-fluid' >
                <OwlCarousel
                    className="owl-theme"
                    items={3} margin={8} autoplay={true}
                >
                    {
                        products ? products.map((e, index) => {
                            return (
                                <div key={index}>
                                    <Link to={"/product/"+e.productID}>
                                        <img className="img" src={'/images/' + e.productImage} />
                                    </Link>
                                </div>
                            )
                        }) : null
                    }
                 

                </OwlCarousel>
            </div>
        )
    }
}