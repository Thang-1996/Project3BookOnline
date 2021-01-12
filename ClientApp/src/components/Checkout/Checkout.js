import React, { Component } from 'react';
import Adapter from '../Adapter';
import API from '../API';
import { Link } from 'react-router-dom';
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
        let orders = [];
        let payment = 1;
        API.post(Adapter.saveOrder.url, {
            params: {
             /*   cart: this.state.cart,
                orders: orders,*/
                payment: payment
            } 
        }).then(res => {
                /*localStorage.setItem("cart", null);
                alert("Thành công")*/
            console.log(res.data)
            }).catch(err => {
            /*alert("Thất bại")*/
                console.log(err)
            });

      /*  this.setState({
            cart: []
        });

        cart = [];

        localStorage.clear();
        alert("Thành công")
        window.location.reload();*/
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
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/check-out">Thanh toán</Link></li>
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
                                                <h3>Chi tiết hóa đơn</h3>
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-12">
                                                        <div className="checkout-form-list">
                                                            <label>Địa chỉ <span className="required">*</span></label>
                                                            <input type="text" placeholder="Địa chỉ nhận hàng" />
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
                                                            <label>Ghi chú</label>
                                                        <textarea placeholder="Ghi chú về đơn đặt hàng của bạn, ví dụ: Lưu ý đặc biệt để giao hàng." rows={10} cols={30} id="checkout-mess" defaultValue={""} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12 col-12">
                                            <div className="your-order">
                                                <h4>Đơn hàng của bạn</h4>
                                                <div className="your-order-table table-responsive">
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th className="product-name">Sản phẩm</th>
                                                                <th className="product-total">Tổng</th>
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
                                                                <th>Tổng tiền giỏ hàng</th>
                                                                <td><span className="amount">{Adapter.format_money(total)}</span></td>
                                                            </tr>
                                                            <tr className="shipping">
                                                            <th data-toggle="tooltip" data-placement="left" title="Miễn phí ship với đơn hàng lớn hơn 500.000đ">Shipping</th>
                                                                <td>
                                                                    <ul>
                                                                    <li>
                                                                        {total > 500000 ? 0 : Adapter.format_money(30000)}
                                                                        </li>
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                            <tr className="order-total">
                                                            <th>Tổng tiền thanh toán</th>
                                                            <td><strong><span className="amount">{total > 500000 ? Adapter.format_money(total) : Adapter.format_money(total + 30000)}</span></strong>
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
                                                                                VNPay
                                      </a>
                                                                        </h4>
                                                                    </div>
                                                                    <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                                                                        <div className="panel-body">
                                                                        <p>
                                                                            <input type="radio" name="thanhtoan" value={2} />
                                                                            VNPay
                                                                        </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            <div className="panel panel-default">
                                                                <div className="panel-heading" role="tab" id="headingTwo">
                                                                    <h4 className="panel-title">
                                                                        <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                            Thanh toán trả sau khi nhận hàng
                                      </a>
                                                                    </h4>
                                                                </div>
                                                                <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                                                    <div className="panel-body">
                                                                        <p>
                                                                            <input type="radio" name="thanhtoan" value={1} />
                                                                        Vui lòng hoàn thiện tiền hàng cho shipper sau khi nhận hàng.</p>
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
                                                                        <p>
                                                                            <input type="radio" name="thanhtoan" value={1} /> Thanh toán bằng paypal
                                                                        </p>
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