import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import notification from '../../notification';
import Adapter from '../Adapter';
import API from '../API';
export default class ProFile extends Component {
    constructor(props) {
        super(props);
        let orders = props.orders;
        this.state = {
            currentUser: props.currentUser,
            orders: orders,
            order: orders.length !== 0 ? orders[0] : null,
            redirect: false,
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
    changeValue = (event) => {
        let currentUser = this.state.currentUser;
       
        let nameValue = event.target.name;
        currentUser[nameValue] = event.target.value;
        this.setState({ currentUser: currentUser });
     

    }
    saveChangeUser = async (event) => {
        event.preventDefault();
        let currentUser = this.state.currentUser;

        await API.post(Adapter.saveChangeUser.url, currentUser)
            .then(res => {
                notification('success', 'Cập nhật thông tin cá nhân thành công');
                this.setState({ redirect: true })
                this.props.updateUser(res.data);
      
               
            }).catch(err => {

            })
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
    checkStatusOrder(status) {
        let statusResult = "";
        switch (status) {
            case 1:
                statusResult = "Đang giao";
                break;
            case 2:
                statusResult = "Hoàn thành";
                break;
            case 3:
                statusResult = "Hủy đơn";
                break;
            default:
                break;
        }
        return statusResult;
    }
    render() {
        const { currentUser, orders, order, redirect } = this.state;
        console.log(order);
        let total = 0;
        if (redirect) {
            return <Redirect to='/profile' />;
        }
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
                                                                                const date = new Date(e.createAt);
                                                                                return (
                                                                                    <tr key={ index}>
                                                                                        <td>{++index}</td>
                                                                                        <td>{date.toLocaleDateString()}</td>
                                                                                        <td>{this.checkStatusOrder(e.status)}</td>
                                                                                        <td>{Adapter.format_money(e.grandTotal)}</td>
                                                                                        <td>
                                                                                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={this.orderDetails.bind(this, e)}>Chi tiết</button>
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
                                           
                                                    <div className="tab-pane fade" id="account-info" role="tabpanel">
                                                        <div className="myaccount-content">
                                                            <h5>Thông tin cá nhân</h5>
                                                            <div className="account-details-form">
                                                                <form action="#">
                                                                    <div className="single-input-item">
                                                                        <label htmlFor="display-name" className="required">Tên </label>
                                                                        <input type="text" value={(currentUser ? currentUser.name : '') || ''} onChange={this.changeValue} name="name"  placeholder="Tên tài khoản" />
                                                                    </div>
                                                                    <div className="single-input-item">
                                                                        <label htmlFor="email" className="required">Email</label>
                                                                        <input type="email" value={(currentUser ? currentUser.email : '') || ''} onChange={this.changeValue} name="email"  placeholder="Địa chỉ email" />
                                                                    </div>
                                                                    <div className="single-input-item">
                                                                        <label htmlFor="email" className="required">Địa chỉ: </label>
                                                                        <input type="text" value={(currentUser ? currentUser.address : '') || ''} onChange={this.changeValue} name="address"  placeholder="Địa chỉ" />
                                                                    </div>
                                                                    <div className="single-input-item">
                                                                        <label htmlFor="email" className="required">Số điện thoại: </label>
                                                                        <input type="text" value={(currentUser ? currentUser.phoneNumber : '') || ''} onChange={this.changeValue} name="phoneNumber" placeholder="Số điện thoại" />
                                                                    </div>
                                                                    <fieldset>
                                                                        <legend>Password change</legend>
                                                                        <div className="single-input-item">
                                                                            <label htmlFor="current-pwd" className="required">Mật khẩu hiện tại</label>
                                                                            <input type="password" readOnly={ true} defaultValue={currentUser ? currentUser.passwordHash : ''} placeholder="Mật khẩu hiện tại" />
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-lg-12">
                                                                                <div className="single-input-item">
                                                                                    <label htmlFor="new-pwd" className="required">Mật khẩu mới</label>
                                                                                    <input type="password" name="passwordHash" value={(currentUser ? currentUser.passwordHash : '') || ''} onChange={this.changeValue} placeholder="Mật khẩu mới" />
                                                                                </div>
                                                                            </div>
                                                                       
                                                                        </div>
                                                                    </fieldset>
                                                                    <div className="single-input-item">
                                                                        <button type="submit" onClick={this.saveChangeUser} className="btn btn-sqr">Lưu</button>
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
                <div className="modal fade bd-example-modal-lg" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                  
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content p-5">
                            <div className="container">
                                <h6>Thông tin vận chuyển :</h6>
                                <p style={{fontSize : '14px'}} >Tên người nhận : {order ? order.customerName : ''}</p>
                                <p style={{ fontSize: '14px' }}>Địa chỉ nhận hàng  : {order ? order.address : ''}</p>
                                <p style={{ fontSize: '14px' }}>Ngày đặt hàng : {order ? Adapter.formatDate(order.createAt) : ''}</p>
                                <p style={{ fontSize: '14px' }}>Điện thoại : {order ? order.telephone : ''}</p>
                                {
                                    order ? order.status == 2 ? <p style={{ fontSize: '14px' }}>Thời gian nhận hàng : {order ? Adapter.formatDate(order.updateAt) : ''}</p> : <p style={{ fontSize: '14px' }}>Đang giao hàng</p> : ''
                                }
                            

                                
                            </div>

                            <h6 style={{ marginTop: '30px',marginLeft : '15px'}}>Thông tin đơn hàng :</h6>
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
                                                    <td><img style={{ width: "50px", height: "50px" }} src={"/images/" + e.products.productImage} /></td>
                                                    <td>{e.quantity}</td>
                                                    <td>{Adapter.format_money(e.products.price)}</td>
                                                    <td>{Adapter.format_money(e.quantity * e.products.price)}</td>
                                                </tr>
                                                )
                                        }) : null
                                    }
                                </tbody>
                            </table>
                            <h6 className="text-right">Tổng tiền đơn hàng : {Adapter.format_money(total)} </h6>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
