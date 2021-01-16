import React, { Component } from 'react';
import { SliderHome } from './OwlCarousel/SliderHome';
import CarouselHome from './OwlCarousel/CarouselHome';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: props.products,
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.products !== prevState.products) {
            return {
                products: nextProps.products,
            };
        }
        return null;;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.products !== this.props.products) {
            this.setState({
                products: this.props.products,
            });
        }
    }

  render () {
    return (
        <div>
            <SliderHome/>
            <div className="slider-area">
                <div className="slider-active owl-carousel">
                    <div className="single-slider pt-105 pb-225 bg-img" style={{ backgroundImage: 'url(img/slider/5.jpg)' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="slider-content-3 slider-animated-1 pl-295">
                                        <h1>Do it <br />Yourself</h1>
                                        <p className="slider-sale">
                                            <span className="sale1">-20%</span>
                                            <span className="sale2">
                                                <strong>£80.00</strong>
                                          £60.00
                                        </span>
                                        </p>
                                        <a href="#">Shop now!</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="single-slider pt-105 pb-225 bg-img" style={{ backgroundImage: 'url(img/slider/6.jpg)' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="slider-content-3 slider-animated-1 pl-295">
                                        <h1>Do it <br />Yourself</h1>
                                        <p className="slider-sale">
                                            <span className="sale1">-20%</span>
                                            <span className="sale2">
                                                <strong>£80.00</strong>
                                              £60.00
                                            </span>
                                        </p>
                                        <a href="#">Shop now!</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="banner-area-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-12">
                            <div className="banner-img-2 mt-30">
                                <a href="#"><img src="img/banner/14.jpg" alt="banner" /></a>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-12">
                            <div className="banner-total mt-30">
                                <div className="single-banner-7 xs-mb">
                                    <div className="banner-img-2">
                                        <a href="#"><img src="img/banner/15.jpg" alt="banner" /></a>
                                    </div>
                                </div>
                                <div className="single-banner-3 col-xs-12">
                                    <div className="banner-img-2">
                                        <a href="#"><img src="img/banner/16.jpg" alt="banner" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="banner-total-2">
                                <div className="single-banner-4 hidden-xs">
                                    <div className="banner-img-2">
                                        <a href="#"><img src="img/banner/17.jpg" alt="banner" /></a>
                                    </div>
                                </div>
                                <div className="single-banner-5">
                                    <div className="banner-img-2">
                                        <a href="#"><img src="img/banner/18.jpg" alt="banner" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-area pt-90 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title text-center mb-30">
                                <h2>QUAN TÂM HÀNG ĐẦU</h2>
                                <p>Duyệt qua bộ sưu tập các sản phẩm bán chạy nhất và hàng đầu của chúng tôi.<br />
                                    Tôi chắc chắn sẽ tìm thấy những gì bạn đang tìm kiếm.</p>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <CarouselHome products={ this.state.products}/>
                        </div>
                    </div>
                 
                </div>
            </div>
            <div className="banner-area-5 mb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="banner-img-2">
                                <a href="#"><img src="img/banner/5.jpg" alt="banner" /></a>
                                <div className="banner-text">
                                    <h2>Giảm giá lên tới 30%</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="banner-area banner-res-large pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                            <div className="single-banner service-mrg-btm">
                                <div className="banner-img">
                                    <a href="#"><img src="img/banner/1.png" alt="banner" /></a>
                                </div>
                                <div className="banner-text">
                                    <h4>Miễn phí vận chuyển</h4>
                                    <p>Với tất cả đơn hàng lớn hơn 300.000đ</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                            <div className="single-banner service-mrg-btm">
                                <div className="banner-img">
                                    <a href="#"><img src="img/banner/2.png" alt="banner" /></a>
                                </div>
                                <div className="banner-text">
                                    <h4>Đảm bảo</h4>
                                    <p>Hoàn tiền 100%</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                            <div className="single-banner">
                                <div className="banner-img">
                                    <a href="#"><img src="img/banner/3.png" alt="banner" /></a>
                                </div>
                                <div className="banner-text">
                                    <h4>Thanh toán khi giao hàng</h4>
                                    <p>Phương thức thanh toán đa dạng</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                            <div className="single-banner mrg-none-xs">
                                <div className="banner-img">
                                    <a href="#"><img src="img/banner/4.png" alt="banner" /></a>
                                </div>
                                <div className="banner-text">
                                    <h4>Liên hệ hỗ trợ</h4>
                                    <p>Call us : + 0123.4567.89</p>
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
