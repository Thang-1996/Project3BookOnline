import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }
    render() {

        return (
            <footer>
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="footer-top-menu bb-2">
                                    <nav>
                                        <ul>
                                            <li><a href="#">Trang chủ</a></li>
                                            <li><a href="#">Bật Cookies</a></li>
                                            <li><a href="#">Chính sách và quyền riêng tư</a></li>
                                            <li><a href="#">Liên hệ chúng tôi</a></li>
                                            <li><a href="#">Blog</a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* footer-mid-start */}
                <div className="footer-mid ptb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-12">
                                <div className="row">
                                    <div className="col-lg-4 col-md-4 col-12">
                                        <div className="single-footer br-2 xs-mb">
                                            <div className="footer-title mb-20">
                                                <h3>Sản phẩm</h3>
                                            </div>
                                            <div className="footer-mid-menu">
                                                <ul>
                                                    <li><a href="about.html">Về chúng tôi</a></li>
                                                    <li><a href="#">Giảm giá</a></li>
                                                    <li><a href="#">Sản phẩm mới</a></li>
                                                    <li><a href="#">Giá tốt nhất</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-12">
                                        <div className="single-footer br-2 xs-mb">
                                            <div className="footer-title mb-20">
                                                <h3>Công ty của chúng tôi</h3>
                                            </div>
                                            <div className="footer-mid-menu">
                                                <ul>
                                                    <li><a href="contact.html">Liên hệ chúng tôi</a></li>
                                                    <li><a href="#">Bản đồ</a></li>
                                                    <li><a href="#">Cửa hàng</a></li>
                                                    <li><a href="register.html">Tài khoản</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-12">
                                        <div className="single-footer br-2 xs-mb">
                                            <div className="footer-title mb-20">
                                                <h3> Tài khoản của bạn</h3>
                                            </div>
                                            <div className="footer-mid-menu">
                                                <ul>
                                                    <li><a href="contact.html">Địa chỉ</a></li>
                                                    <li><a href="#">Tín dụng</a></li>
                                                    <li><a href="#">Đơn hàng</a></li>
                                                    <li><a href="#">Thông tin cá nhân</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <div className="single-footer mrg-sm">
                                    <div className="footer-title mb-20">
                                        <h3>Thông tin cửa hàng</h3>
                                    </div>
                                    <div className="footer-contact">
                                        <p className="adress">
                                            <span>Công ty</span>
                                                Số 08, Tôn Thất Thuyết, Mỹ Đình, Hà Nội
                                        </p>
                                        <p><span>Số điện thoại</span> (+84)899999999</p>
                                        <p><span>Email:</span> nhanphamteam@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* footer-mid-end */}
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row bt-2">
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="copy-right-area">
                                    <p>Copyright ©<Link to="/">Online Book Store</Link>. All Right Reserved.</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="payment-img text-right">
                                    <a href="#"><img src="img/1.png" alt="payment" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
