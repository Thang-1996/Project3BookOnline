import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import API from '../API';
import Adapter from '../Adapter';
import { Link } from 'react-router-dom';
import publicIP from 'public-ip';
export default class CarouselHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visit: {
                userIP: '',
                ProductID: '',
            },
            products: props.products,
        };
    }
    increaseCount = async (e) => {

        let userIP = await publicIP.v4();
        let visit = this.state.visit;
        visit.userIP = userIP;
        visit.ProductID = e.productID;
        this.setState({ visit: visit })

        await API.post(Adapter.increaseCount.url, visit)
            .then(res => {

            }).catch(err => {

            });


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
                                    <Link onClick={this.increaseCount.bind(this,e)} to={"/product/" + e.productID}>
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