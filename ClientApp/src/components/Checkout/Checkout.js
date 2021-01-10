﻿import React, { Component } from 'react';
import Adapter from '../Adapter';
import API from '../API';
export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: props.cart,
            currentUser : props.currentUser
        };
        this.checkOut = this.checkOut.bind(this);
        
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.cart !== prevState.cart) {
            return { cart: nextProps.cart };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cart !== this.props.cart) {
            //Perform some operation here
            this.setState({ cart: this.props.cart });
        }
    }
    checkOut() {
        let cart = this.state.cart;

        API.post(Adapter.order.url, cart )

       /* API.post(Adapter.checkOut.url, {
            params: { cart: this.state.cart} 
        })

            .then(res => {
                localStorage.setItem("cart", null);
                alert("Thành công")
            }).catch(err => {
                alert("Thất bại")
            });*/
        this.setState({
            cart: []
        });

        cart = [];

        localStorage.clear();
        alert("Thành công")
        window.location.reload();
    }
    render() {
        const { cart, currentUser } = this.state;
        console.log(currentUser);
        let total = 0;
        return (
            <div>
                <div className="breadcrumbs-area mb-70">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumbs-menu">
                                    <ul>
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#" className="active">checkout</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="checkout-area mb-70">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-12 col-12">
                                            <div className="checkbox-form">
                                                <h3>Billing Details</h3>
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-12">
                                                        <div className="checkout-form-list">
                                                            <label>Address <span className="required">*</span></label>
                                                            <input type="text" placeholder="Street address" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-12">
                                                        <div className="checkout-form-list">
                                                            <input type="text" placeholder="Apartment, suite, unit etc. (optional)" />
                                                        </div>
                                                    </div>  
                                                    <div className="col-lg-12 col-md-12 col-12">
                                                       
                                                        <div className="checkout-form-list create-account" id="cbox_info" style={{ display: 'none' }}>
                                                            <p>Create an account by entering the information below. If you are a returning customer please login at the top of the page.</p>
                                                            <label>Account password  <span className="required">*</span></label>
                                                            <input type="password" placeholder="password" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="different-address">
                                                    <div className="order-notes">
                                                        <div className="checkout-form-list">
                                                            <label>Order Notes</label>
                                                            <textarea placeholder="Notes about your order, e.g. special notes for delivery." rows={10} cols={30} id="checkout-mess" defaultValue={""} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12 col-12">
                                            <div className="your-order">
                                                <h3>Your order</h3>
                                                <div className="your-order-table table-responsive">
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th className="product-name">Product</th>
                                                                <th className="product-total">Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                cart ? cart.map((e, index) => {
                                                                    total += e.product.price * e.quantity;
                                                                    return (
                                                                        <tr key={index} className="cart_item">
                                                                            <td className="product-name">
                                                                                {e.product.productName} <strong className="product-quantity"> × {e.quantity }</strong>
                                                                            </td>
                                                                            <td className="product-total">
                                                                                <span className="amount">{Adapter.format_money(e.product.price * e.quantity)}</span>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }) : null
                                                            }
                                                            
                                                        </tbody>
                                                        <tfoot>
                                                            <tr className="cart-subtotal">
                                                                <th>Cart Subtotal</th>
                                                                <td><span className="amount">{Adapter.format_money(total)}</span></td>
                                                            </tr>
                                                            <tr className="shipping">
                                                                <th>Shipping</th>
                                                                <td>
                                                                    <ul>
                                                                        <li>
                                                                            <input type="radio" />
                                                                            <label>
                                                                                Flat Rate: <span className="amount">7.00</span>
                                                                            </label>
                                                                        </li>
                                                                        
                                                                        <li>
                                                                            <input type="radio" />
                                                                            <label>Free Shipping:</label>
                                                                        </li>
                                                                        <li />
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                            <tr className="order-total">
                                                                <th>Order Total</th>
                                                                <td><strong><span className="amount">{ total }</span></strong>
                                                                </td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>
                                                <div className="payment-method">
                                                    <div className="payment-accordion">
                                                        <div className="collapses-group">
                                                            <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                                                <div className="panel panel-default">
                                                                    <div className="panel-heading" role="tab" id="headingOne">
                                                                        <h4 className="panel-title">
                                                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                                Direct Bank Transfer
                                      </a>
                                                                        </h4>
                                                                    </div>
                                                                    <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                                                                        <div className="panel-body">
                                                                            <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="panel panel-default">
                                                                    <div className="panel-heading" role="tab" id="headingTwo">
                                                                        <h4 className="panel-title">
                                                                            <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                                Cheque Payment
                                      </a>
                                                                        </h4>
                                                                    </div>
                                                                    <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                                                        <div className="panel-body">
                                                                            <p>Please send your cheque to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="panel panel-default">
                                                                    <div className="panel-heading" role="tab" id="headingThree">
                                                                        <h4 className="panel-title">
                                                                            <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                                PayPal <img src="img/2.png" alt="payment" />
                                                                            </a>
                                                                        </h4>
                                                                    </div>
                                                                    <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                                                                        <div className="panel-body">
                                                                            <p>Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                <div className="order-button-payment">
                                                    <button className="btn btn-primary" onClick={this.checkOut} >Xác nhận</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}