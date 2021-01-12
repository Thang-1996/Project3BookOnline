import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Adapter from '../Adapter';
export default class ProFile extends Component {
    constructor(props) {
        super(props);
        let orders = props.orders;
        this.state = {
            currentUser: props.currentUser,
            orders: orders,
            order: orders.length !== 0 ? orders[0] : null,
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentUser !== prevState.currentUser || nextProps.orders !== prevState.orders) {
            return {
                currentUser: nextProps.currentUser,
                orders: nextProps.orders
            };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentUser !== this.props.currentUser || prevProps.orders !== this.props.orders) {
            this.setState({
                currentUser: this.props.currentUser,
                orders: this.props.orders
            });
        }
    }
    
    orderDetails = (event) => {
        this.setState({
            order: event
        })
    }
    render() {
        const { currentUser, orders, order } = this.state;
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
                                        <li><Link to="/profile">Cá nhân</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div className="my-account-wrapper mb-70">
                    <div className="container">
                        <div className="section-bg-color">
                            <div className="row">
                                <div className="col-lg-12">
                                 
                                    <div className="myaccount-page-wrapper">
                                     
                                        <div className="row">
                                            <div className="col-lg-3 col-md-4">
                                                <div className="myaccount-tab-menu nav" role="tablist">
                                                    <a href="#orders" data-toggle="tab"><i className="fa fa-cart-arrow-down" />Đơn hàng</a>
                                                    <a href="#address-edit" data-toggle="tab"><i className="fa fa-map-marker" />Địa chỉ</a>                                              
                                                    
                                                    <a href="#account-info" data-toggle="tab"><i className="fa fa-user" />Thông tin cá nhân</a>
                                                    <a href="/authentication/logout"><i className="fa fa-sign-out" /> Đăng xuất</a>
                                                </div>
                                            </div>
                                            <div className="col-lg-9 col-md-8">
                                                <div className="tab-content" id="myaccountContent">
                                               
                                                    <div className="tab-pane active" id="orders" role="tabpanel">
                                                        <div className="myaccount-content">
                                                            <h5>Đơn hàng</h5>
                                                            <div className="myaccount-table table-responsive text-center">
                                                                <table className="table table-bordered">
                                                                    <thead className="thead-light">
                                                                        <tr>
                                                                            <th>Đơn hàng</th>
                                                                            <th>Ngày đặt</th>
                                                                            <th>Trạng thái</th>
                                                                            <th>Tổng tiền</th>
                                                                            <th>Chi tiết đơn hàng</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            orders ? orders.map((e, index) => {
                                                                                return (
                                                                                    <tr key={ index}>
                                                                                        <td>{ ++index }</td>
                                                                                        <td>{e.createAt}</td>
                                                                                        <td>Đang giao</td>
                                                                                        <td>{Adapter.format_money(e.grandTotal)}</td>
                                                                                        <td>
                                                                                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={ this.orderDetails.bind(this, e)}>Chi tiết</button>
                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            }) : null
                                                                        }
                                                                        
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="address-edit" role="tabpanel">
                                                        <div className="myaccount-content">
                                                            <h5>Địa chỉ</h5>
                                                            <address>
                                                                <p><strong>{currentUser ? currentUser.userName : ""}</strong></p>
                                                                <p>1355 Market St, Suite 900 <br />
                                  San Francisco, CA 94103</p>
                                                                <p>Số điện thoại: {currentUser ? currentUser.phoneNumber : "" }</p>
                                                            </address>
                                                            <a href="#" className="btn btn-sqr"><i className="fa fa-edit" />
                                Thay đổi địa chỉ</a>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="account-info" role="tabpanel">
                                                        <div className="myaccount-content">
                                                            <h5>Thông tin cá nhân</h5>
                                                            <div className="account-details-form">
                                                                <form action="#">
                                                                    <div className="single-input-item">
                                                                        <label htmlFor="display-name" className="required">Tên </label>
                                                                        <input type="text" name="userName" defaultValue={currentUser ? currentUser.userName : "" } id="display-name" placeholder="Display Name" />
                                                                    </div>
                                                                    <div className="single-input-item">
                                                                        <label htmlFor="email" className="required">Email</label>
                                                                        <input type="email" defaultValue={currentUser ? currentUser.userName : "" } id="email" placeholder="Email Address" />
                                                                    </div>
                                                                    <fieldset>
                                                                        <legend>Password change</legend>
                                                                        <div className="single-input-item">
                                                                            <label htmlFor="current-pwd" className="required">Mật khẩu hiện tại</label>
                                                                            <input type="password" id="current-pwd" placeholder="Mật khẩu hiện tại" />
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-lg-6">
                                                                                <div className="single-input-item">
                                                                                    <label htmlFor="new-pwd" className="required">Mật khẩu mới</label>
                                                                                    <input type="password" id="new-pwd" placeholder="Mật khẩu mới" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6">
                                                                                <div className="single-input-item">
                                                                                    <label htmlFor="confirm-pwd" className="required">Xác nhận</label>
                                                                                    <input type="password" id="confirm-pwd" placeholder="Xác nhận lại mật khẩu" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </fieldset>
                                                                    <div className="single-input-item">
                                                                        <button className="btn btn-sqr">Lưu</button>
                                                                    </div>
                                                                </form>
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
                    </div>
                </div>
                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content p-5">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Tên sách</th>
                                        <th>Ảnh bìa</th>
                                        <th>Số lượng</th>
                                        <th>Giá tiền</th>
                                        <th>Tổng tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        order ? order.orderProducts.map((e, index) => {
                                            total += e.quantity * e.products.price;
                                            return (
                                                <tr key={index}>
                                                    <td>{e.products.productName}</td>
                                                    <td><img style={{ width: "100px", height: "80px" }} src={"/images/" + e.products.productImage} /></td>
                                                    <td>{e.quantity}</td>
                                                    <td>{Adapter.format_money(e.products.price)}</td>
                                                    <td>{Adapter.format_money(e.quantity * e.products.price)}</td>
                                                </tr>
                                                )
                                        }) : null
                                    }
                                </tbody>
                            </table>
                            <h4 className="text-right">Tổng tiền đơn hàng : {Adapter.format_money(total)} </h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
