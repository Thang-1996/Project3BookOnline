import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import API from '../API';
import Adapter from '../Adapter';
import { Link } from 'react-router-dom';
import publicIP from 'public-ip';
export default class MyWishList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wishlist: [],
        };
    }
    componentDidMount() {
        let currentUser = this.props.currentUser;
        
        let id = 0;
        if (currentUser) {
            id = currentUser.id;
        }
        API.get(Adapter.getWishList.url, {
            params: {
                id: id
            }
        }).then(res => {
            this.setState({
                wishlist: res.data
            })
        }).catch(err => {

        });

    }

    render() {
        const { wishlist } = this.state;
        console.log(this.props.currentUser)
        console.log(wishlist)
        return (
            <div className='container-fluid' >
                <OwlCarousel
                    className="owl-theme"
                    items={2} margin={8} autoplay={true}
                >
                    {
                        wishlist ? wishlist.map((e, index) => {
                            return (
                                <div key={index}>
                                    <Link to={"/product/" + e.product.productID}>
                                        <img className="img" src={'/images/' + e.product.productImage} />
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