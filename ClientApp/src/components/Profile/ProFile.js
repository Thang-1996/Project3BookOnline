import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class ProFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
  /*  static getDerivedStateFromProps(nextProps, prevState) {
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
    }*/
    
    render() {
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
                                               
                                                    <div className="tab-pane fade" id="orders" role="tabpanel">
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
                                                                        <tr>
                                                                            <td>1</td>
                                                                            <td>June 12, 2017</td>
                                                                            <td>On Hold</td>
                                                                            <td>$990</td>
                                                                            <td><a href="cart.html" className="btn btn-sqr">View</a>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="address-edit" role="tabpanel">
                                                        <div className="myaccount-content">
                                                            <h5>Địa chỉ</h5>
                                                            <address>
                                                                <p><strong>Erik Jhonson</strong></p>
                                                                <p>1355 Market St, Suite 900 <br />
                                  San Francisco, CA 94103</p>
                                                                <p>Mobile: (123) 456-7890</p>
                                                            </address>
                                                            <a href="#" className="btn btn-sqr"><i className="fa fa-edit" />
                                Edit Address</a>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="account-info" role="tabpanel">
                                                        <div className="myaccount-content">
                                                            <h5>Thông tin cá nhân</h5>
                                                            <div className="account-details-form">
                                                                <form action="#">
                                                                    <div className="row">
                                                                        <div className="col-lg-6">
                                                                            <div className="single-input-item">
                                                                                <label htmlFor="first-name" className="required">First
                                          Name</label>
                                                                                <input type="text" id="first-name" placeholder="First Name" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <div className="single-input-item">
                                                                                <label htmlFor="last-name" className="required">Last
                                          Name</label>
                                                                                <input type="text" id="last-name" placeholder="Last Name" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="single-input-item">
                                                                        <label htmlFor="display-name" className="required">Display Name</label>
                                                                        <input type="text" id="display-name" placeholder="Display Name" />
                                                                    </div>
                                                                    <div className="single-input-item">
                                                                        <label htmlFor="email" className="required">Email Addres</label>
                                                                        <input type="email" id="email" placeholder="Email Address" />
                                                                    </div>
                                                                    <fieldset>
                                                                        <legend>Password change</legend>
                                                                        <div className="single-input-item">
                                                                            <label htmlFor="current-pwd" className="required">Current
                                        Password</label>
                                                                            <input type="password" id="current-pwd" placeholder="Current Password" />
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-lg-6">
                                                                                <div className="single-input-item">
                                                                                    <label htmlFor="new-pwd" className="required">New
                                            Password</label>
                                                                                    <input type="password" id="new-pwd" placeholder="New Password" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6">
                                                                                <div className="single-input-item">
                                                                                    <label htmlFor="confirm-pwd" className="required">Confirm
                                            Password</label>
                                                                                    <input type="password" id="confirm-pwd" placeholder="Confirm Password" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </fieldset>
                                                                    <div className="single-input-item">
                                                                        <button className="btn btn-sqr">Save Changes</button>
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
            </div>
        );
    }
}
