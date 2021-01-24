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
                                            <li><a href="#">home</a></li>
                                            <li><a href="#">Enable Cookies</a></li>
                                            <li><a href="#">Privacy and Cookie Policy</a></li>
                                            <li><a href="#">contact us</a></li>
                                            <li><a href="#">blog</a></li>
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
                                                <h3>Product</h3>
                                            </div>
                                            <div className="footer-mid-menu">
                                                <ul>
                                                    <li><a href="about.html">About us</a></li>
                                                    <li><a href="#">Prices drop </a></li>
                                                    <li><a href="#">New products</a></li>
                                                    <li><a href="#">Best sales</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-12">
                                        <div className="single-footer br-2 xs-mb">
                                            <div className="footer-title mb-20">
                                                <h3>Our company</h3>
                                            </div>
                                            <div className="footer-mid-menu">
                                                <ul>
                                                    <li><a href="contact.html">Contact us</a></li>
                                                    <li><a href="#">Sitemap</a></li>
                                                    <li><a href="#">Stores</a></li>
                                                    <li><a href="register.html">My account </a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-12">
                                        <div className="single-footer br-2 xs-mb">
                                            <div className="footer-title mb-20">
                                                <h3>Your account</h3>
                                            </div>
                                            <div className="footer-mid-menu">
                                                <ul>
                                                    <li><a href="contact.html">Addresses</a></li>
                                                    <li><a href="#">Credit slips </a></li>
                                                    <li><a href="#"> Orders</a></li>
                                                    <li><a href="#">Personal info</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <div className="single-footer mrg-sm">
                                    <div className="footer-title mb-20">
                                        <h3>STORE INFORMATION</h3>
                                    </div>
                                    <div className="footer-contact">
                                        <p className="adress">
                                            <span>My Company</span>
                                        42 avenue des Champs Elysées 75000 Paris France
                                    </p>
                                        <p><span>Call us now:</span> (+1)866-540-3229</p>
                                        <p><span>Email:</span> support@hastech.com</p>
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
