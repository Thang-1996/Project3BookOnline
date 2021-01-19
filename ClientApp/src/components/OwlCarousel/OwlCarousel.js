import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';
import publicIP from 'public-ip';
import API from '../API';
import Adapter from '../Adapter';
export class Owldemo1 extends Component {
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
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.products !== prevState.products) {
            return {
                products: nextProps.products,
            };
        }
        return null;;
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


export default Owldemo1;