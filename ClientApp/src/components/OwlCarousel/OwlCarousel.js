﻿import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';
export class Owldemo1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: props.products,
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.products !== prevState.products) {
            return {
                products: nextProps.products,
            };
        }
        return null;;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.products !== this.props.products) {
            this.setState({
                products: this.props.products,
            });
        }
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
                                    <Link to={"/product/" + e.productID}>
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


export default Owldemo1;