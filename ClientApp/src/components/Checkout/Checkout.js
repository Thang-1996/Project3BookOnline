﻿import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Adapter from '../Adapter';
import API from '../API';
import { Link } from 'react-router-dom';
import notification from '../../notification';
import Loading from '../isLoading';
import PayPal from '../../PayPal';
export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: {
                CustomerName : '',
                CreateAt: '',
                UpdateAt: '',
                Telephone: '',
                Address: '',
                Status: 1,
                GrandTotal: 0,
                OrderNote: '',
                paymenttype: '',
                UserID: '',
          
            },
            cart: props.cart,
            currentUser: props.currentUser,
            redirect: false,
            isLoading: false,
            PayPalStatus : '',
   
        };
        this.checkOut = this.checkOut.bind(this);
       
        
    }
    componentDidMount() {
        let currentUser = this.state.currentUser;
        let orders = this.state.orders;
        if (currentUser) {
            orders.Address = currentUser.address;
            orders.Telephone = currentUser.phoneNumber;
            orders.CustomerName = currentUser.name;
        }
        this.setState({ orders: orders })
    }
    handleOnChange = event => {
        let orders = this.state.orders;
        let currentUser = this.props.currentUser;
        let nameValue = event.target.name;
        orders[nameValue] = event.target.value;
      
        this.setState({ orders: orders })
    }
   

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.cart !== prevState.cart || nextProps.currentUser !== prevState.currentUser) {
            return {
                cart: nextProps.cart,
                currentUser: nextProps.currentUser,
            };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cart !== this.props.cart || prevProps.currentUser !== this.props.currentUser) {
            //Perform some operation here
            this.setState({
                cart: this.props.cart,
                currentUser: this.props.currentUser
            });
        }
    }
    getOrderDetailPayPal = async (e) => {
        this.setState({ PayPalStatus: e })
 
    }
    checkOut() {
        this.setState({
            isLoading: true,
        });
        let cart = this.state.cart;
        let orders = this.state.orders;
        let PayPalStatus = this.state.PayPalStatus;
        let currentUser = this.state.currentUser;
        let payment = {
            orders: orders,
            carts: cart,
            PayPalStatus: PayPalStatus,

        }
        if (cart.length == 0) {
            this.setState({
                isLoading: false,
            });
            notification('warning', 'Trong giỏ hàng hiện chưa có cuốn sách nào!');

            return;
        }
        if (orders.Address == '') {
            this.setState({
                isLoading: false,
            });
            notification('warning', 'Vui lòng điền địa chỉ giao hàng');

            return;
        }
        let grandTotal = 0;
        cart.forEach(item => {
            return grandTotal += item.quantity * item.product.price;
        })
        orders.GrandTotal = grandTotal;
        orders.CustomerName = currentUser.name;
        this.setState({ orders: orders })
        API.post(Adapter.saveOrder.url, payment)
            .then(res => {
                if (res.status == 200) {
                    localStorage.removeItem("cart");
                    notification('success', 'Đặt hàng thành công vui lòng kiểm tra email');
                    this.setState({ redirect: true })
                    this.props.cartState();
                    this.props.updateProduct();
                }
            }).catch(err => {
               
            });
        this.setState({
            isLoading: false,
        });
     
    }
    setCOD = () => {
        let orders = this.state.orders;
        orders.paymenttype = 1;
        this.setState({ orders: orders })
    }
    setPayPal = () => {
        let orders = this.state.orders;
        orders.paymenttype = 2;
        this.setState({ orders: orders })
    }
    render() {
        const { cart, currentUser, orders, redirect } = this.state;
        if (redirect) {
            return <Redirect to='/' />;
        }
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
                                                        <label>Tên khách hàng <span className="required">*</span></label>
                                                        <input onChange={this.handleOnChange} value={orders.CustomerName} name="CustomerName" type="text" />
                                                    </div>
                                                    <div className="checkout-form-list">
                                                        <label>Địa chỉ nhận hàng <span className="required">*</span></label>
                                                        <input onChange={this.handleOnChange} required value={orders.Address} name="Address" type="text"/>
                                                    </div>
                                                    <div className="checkout-form-list">
                                                        <label>Số điện thoại: <span className="required">*</span></label>
                                                        <input onChange={this.handleOnChange} type="text" value={orders.Telephone} name="Telephone" />
                                                    </div>
                                                    <div className="different-address">
                                                        <div className="order-notes">
                                                            <div className="checkout-form-list">
                                                                <label>Ghi chú</label>
                                                                <textarea onChange={this.handleOnChange} value={orders.OrderNote} name="OrderNote" placeholder="Ghi chú về đơn đặt hàng của bạn, ví dụ: Lưu ý đặc biệt để giao hàng." rows={10} cols={30} id="checkout-mess" />

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>




                                    </div>
                                    <div className="col-lg-6 col-md-12 col-12">
                                        <div className="your-order">
                                            <h4>ĐƠN HÀNG CỦA BẠN</h4>
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
                                                                            <Link to={"/product/"+e.product.productName}>{e.product.productName}</Link> <strong className="product-quantity"> × {e.quantity}</strong>
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
                                                            <th data-toggle="tooltip" data-placement="left" title="Miễn phí ship với đơn hàng lớn hơn 500.000đ">Phí ship</th>
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
                                                                <div className="panel-heading" role="tab" id="headingTwo">
                                                                    <h4 className="panel-title">
                                                                        <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                            Thanh toán trả sau khi nhận hàng
                                      </a>
                                                                    </h4>
                                                                </div>
                                                                <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                                                    <div className="panel-body">
                                                                        <a onClick={this.setCOD}>
                                                                            <input  type="radio" name="thanhtoan" value={1} />
                                                                        Vui lòng hoàn thiện tiền hàng cho shipper sau khi nhận hàng.</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="panel panel-default">
                                                                <div className="panel-heading" role="tab" id="headingThree">
                                                                    <h4 className="panel-title">
                                                                        <a onClick={ this.setPayPal} className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                            PayPal 
                                                                        </a>
                                                                    </h4>
                                                                </div>
                                                                <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                                                                    <div className="panel-body">
                                                                        <PayPal getOrderDetailPayPal={this.getOrderDetailPayPal} orders={orders} cart={cart} />
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
                <Loading isLoading={this.state.isLoading} />
            </div>
        );
    }
}