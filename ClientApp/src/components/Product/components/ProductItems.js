import React, { Component } from 'react';
import Adapter from '../../Adapter';
import { Link } from 'react-router-dom';

export default class ProductItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product : props.product,
        };
        this.addToCart = this.addToCart.bind(this);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.product !== prevState.product) {
            return { product: nextProps.product };
        }
        return null;
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.product !== this.props.product) {
            //Perform some operation here
            this.setState({ product: this.props.product });
        }
    }
    addToCart() {
        const product = this.props.product;

        let cart = localStorage.getItem("cart");
        if (cart === null) cart = [];
        else cart = JSON.parse(cart);
        let count = 0;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].product.productID === product.productID) {
                if (cart[i].quantity < product.quantity) {
                    cart[i].quantity++;
                } else {
                    alert("Hàng trong kho không đủ");
                }
                count++;
            }
        }
        if (count === 0) {
            cart.push({ product: product, quantity: 1 });
            alert("Thêm hàng vào giỏ thành công")
        }
        localStorage.setItem("cart", JSON.stringify(cart));
   
        this.props.updateCartState();
    }
    render() {
        let product = this.state.product;
        
        return (
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                <div className="product-wrapper mb-40">
                    <div className="product-img">
                        <a>
                            <img src={"/images/" + (product.productImage)} alt="book" className="primary" style={{ width: "400px", height: "250px" }} />
                        </a>
                        <div className="quick-view">
                            <Link  title="Quick View" to={"/product/" + (product.productID)}><i className="fa fa-search-plus" /></Link>
                        </div>
                        <div className="product-flag">
                            <ul>
                                <li><span className="sale">new</span></li>
                                <li><span className="discount-percentage">-5%</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="product-details text-center">
                        <div className="product-rating">
                            <ul>
                                <li><a ><i className="fa fa-star" /></a></li>
                                <li><a ><i className="fa fa-star" /></a></li>
                                <li><a ><i className="fa fa-star" /></a></li>
                                <li><a ><i className="fa fa-star" /></a></li>
                                <li><a ><i className="fa fa-star" /></a></li>
                            </ul>
                        </div>
                        <span>{product.productName}</span>
                        <div className="product-price">
                            <ul>
                                <li>{Adapter.format_money(product.price)}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="product-link">
                        <div className="product-button">
                            <a onClick={ this.addToCart} style={{cursor: "pointer"}} title="Add to cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                        <div className="add-to-link">
                            <ul>
                                <li><Link to={"/product/" + (product.productID)}><i className="fa fa-external-link" /></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
