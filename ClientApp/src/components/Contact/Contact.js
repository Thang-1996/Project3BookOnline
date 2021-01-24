import React, { Component } from 'react';
import { withRouter } from 'react-router';


class Contact extends Component {
    render() {
        return (
            <div>
                <div className="breadcrumbs-area mb-70">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumbs-menu">
                                    <ul>
                                        <li><a href="#">HOME</a></li>
                                        <li><a href="#" className="active">CONTACT</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="map-area mb-70">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div id="googleMap" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact-area mb-70">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="contact-info">
                                    <h3>Contact info</h3>
                                    <ul>
                                        <li>
                                            <i className="fa fa-map-marker" />
                                                <span>Adress: </span>Số 8, Tôn Thất Thuyết, Mỹ Đình, Hà Nội
                                        </li>
                                        <li>
                                            <i className="fa fa-envelope" />
                                                <span>Phone: </span>0989899988
                                            </li>
                                        <li>
                                            <i className="fa fa-mobile" />
                                            <span>Email: </span>
                                            <a href="#">nhanphamteam@gmail.com</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="contact-form">
                                    <h3><i className="fa fa-envelope-o" />Leave a Message</h3>
                                    <form id="contact-form" action="https://demo.hasthemes.com/koparion-preview/koparion/mail.php" method="post">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="single-form-3">
                                                    <input name="name" type="text" placeholder="Name" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="single-form-3">
                                                    <input name="email" type="email" placeholder="Email" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="single-form-3">
                                                    <input name="subject" type="text" placeholder="Subject" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="single-form-3">
                                                    <textarea name="message" placeholder="Message" defaultValue={""} />
                                                    <button className="submit" type="submit">SEND MESSAGE</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <p className="form-messege" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(Contact);