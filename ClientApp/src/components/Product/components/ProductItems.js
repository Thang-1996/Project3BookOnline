﻿import React, { Component } from 'react';
import Adapter from '../../Adapter';

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
                            <img src={"/images/" + (product.productImage)} alt="book" className="primary" />
                        </a>
                        <div className="quick-view">
                            <a className="action-view" data-target="#productModal" data-toggle="modal" title="Quick View">
                                <i className="fa fa-search-plus" />
                            </a>
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
                                <li><a title="Details"><i className="fa fa-external-link" /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}