import React, { Component } from 'react';
import CartProduct from './components/CartProduct';
import { Link } from 'react-router-dom';
import Adapter from '../Adapter';
import Loading from '../isLoading';
export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: props.cart,
            isLoading: false,
        };
        this.updateCartState = this.updateCartState.bind(this);
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
    updateCartState() {
        this.props.updateCartState();
    }
    render() {
        const { cart } = this.state;
        let total = 0;
        return (
            <div>
                <div className="breadcrumbs-area mb-70">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumbs-menu">
                                    <ul>
                                        <li><Link to="/">Trang chủ</Link></li>
                                        <li><a className="active">Giỏ hàng</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="entry-header-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="entry-header-title">
                                    <h2>Giỏ hàng</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div className="cart-main-area mb-70">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <form action="#">
                                    <div className="table-content table-responsive mb-15 border-1">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="product-thumbnail">Ảnh</th>
                                                    <th className="product-name">Tên Sản phẩm</th>
                                                    <th className="product-price">Giá tiền</th>
                                                    <th className="product-quantity">Số lượng</th>
                                                    <th className="product-subtotal">Tổng tiền</th>
                                                    <th className="product-remove">Xóa</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    cart ? cart.map((e, index) => {
                                                        total += e.product.price;
                                                        return (
                                                            <CartProduct updateCartState={this.updateCartState} product={e} key={index}/>
                                                        )
                                                    }) : null
                                                }
                                               
                                           
                                            </tbody>
                                        </table>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8 col-md-6 col-12">
                                <div className="buttons-cart mb-30">
                                    <ul>
                                        <li>
                                            <Link to="/product">Tiếp tục mua sách</Link>
                                         
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                                <div className="cart_totals">
                                    <h2>Tổng: {Adapter.format_money(total)}</h2>
                                    <div className="wc-proceed-to-checkout mtl-10">
                                        <Link to="/check-out">Đến trang thanh toán</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Loading isLoading={this.state.isLoading} />
            </div>
            );
    }
}