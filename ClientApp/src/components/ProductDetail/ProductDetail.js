import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Adapter from '../Adapter';
import { Link } from 'react-router-dom';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: props.cart,
            products: props.products,
            productID: this.props.match.params.id,
            product: null,
        };
        
        this.updateCartState = this.updateCartState.bind(this);
    }
    componentDidMount() {
        let products = this.state.products;
        products.find((item) => {
            if (this.state.productID == item.productID) {
                this.setState({
                    product: item,
                })
            }
        });
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.products !== prevState.products || nextProps.cart !== prevState.cart) {
            return {
                products: nextProps.products,
                cart: nextProps.cart,
            };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.products !== this.props.products || prevProps.cart !== this.props.cart) {

            this.setState({
                products: this.props.products,
                cart: this.props.cart,
            });
        }
    }
    updateCartState() {
        this.props.updateCartState();
    }
    render() {
        const { products, cart, product } = this.state;
        console.log(product)
        return (
            <div>
                <div className="breadcrumbs-area mb-70">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumbs-menu">
                                    <ul>
                                        <li><Link to="/">Home</Link></li>
                                        <li>Product Details</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-main-area mb-70">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 col-md-12 col-12 order-lg-1 order-1">
                             
                                <div className="product-main-area">
                                    <div className="row">
                                        <div className="col-lg-5 col-md-6 col-12">
                                            <div className="flexslider">
                                                <img style={{}} src={product ? "images/" + (product.productImage) : ""} alt="woman" />
                                            </div>
                                        </div>
                                        <div className="col-lg-7 col-md-6 col-12">
                                            <div className="product-info-main">
                                                <div className="page-title">
                                                    <h1>{ product ? product.productName : ""}</h1>
                                                </div>
                                                <div className="product-info-stock-sku">
                                                    <div className="product-attribute">
                                                        <span>Tái bản lần {product ? product.reprinttimes : ""}</span>
                                                        <span className="value">{product ? product.publisher : ""}</span>
                                                    </div>
                                                </div>
                                                <div className="product-reviews-summary">
                                                    <div className="rating-summary">
                                                        <a href="#"><i className="fa fa-star" /></a>
                                                        <a href="#"><i className="fa fa-star" /></a>
                                                        <a href="#"><i className="fa fa-star" /></a>
                                                        <a href="#"><i className="fa fa-star" /></a>
                                                        <a href="#"><i className="fa fa-star" /></a>
                                                    </div>
                                                    <div className="reviews-actions">
                                                        <a href="#">3 Reviews</a>
                                                        <a href="#" className="view">Add Your Review</a>
                                                    </div>
                                                </div>
                                                <div className="product-info-price">
                                                    <div className="price-final">
                                                        <span>{product ? Adapter.format_money(product.price) : ""}</span>
                                                    </div>
                                                </div>
                                                <div className="product-add-form">
                                                    <form action="#">
                                                        <div className="quality-button">
                                                            <input className="qty" type="number" defaultValue={1} />
                                                        </div>
                                                        <a href="#">Add to cart</a>
                                                    </form>
                                                </div>
                                                <div className="product-social-links">
                                                    <div className="product-addto-links">
                                                        <a href="#"><i className="fa fa-heart" /></a>
                                                        <a href="#"><i className="fa fa-pie-chart" /></a>
                                                        <a href="#"><i className="fa fa-envelope-o" /></a>
                                                    </div>
                                                    <div className="product-addto-links-text">
                                                        <p>Bạn hãy NHẬP ĐỊA CHỈ nhận hàng để được dự báo thời gian & chi phí giao hàng một cách chính xác nhất. </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-info-area mt-80">
                           
                                    <ul className="nav">
                                        <li><a className="active" href="#Details" data-toggle="tab">Details</a></li>
                                        <li><a href="#Reviews" data-toggle="tab">Reviews 3</a></li>
                                    </ul>
                                    <div className="tab-content">
                                        <div className="tab-pane fade show active" id="Details">
                                            <div className="valu">
                                                <p style={{ fontSize:"16px" }}>{product ? product.productDescription : ""}</p>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="Reviews">
                                            <div className="valu valu-2">
                                                <div className="section-title mb-60 mt-60">
                                                    <h2>Customer Reviews</h2>
                                                </div>
                                                <ul>
                                                    <li>
                                                        <div className="review-title">
                                                            <h3>themes</h3>
                                                        </div>
                                                        <div className="review-left">
                                                            <div className="review-rating">
                                                                <span>Price</span>
                                                                <div className="rating-result">
                                                                    <a href="#"><i className="fa fa-star" /></a>
                                                                    <a href="#"><i className="fa fa-star" /></a>
                                                                    <a href="#"><i className="fa fa-star" /></a>
                                                                    <a href="#"><i className="fa fa-star" /></a>
                                                                    <a href="#"><i className="fa fa-star" /></a>
                                                                </div>
                                                            </div>
                                                            <div className="review-rating">
                                                                <span>Value</span>
                                                                <div className="rating-result">
                                                                    <a href="#"><i className="fa fa-star" /></a>
                                                                    <a href="#"><i className="fa fa-star" /></a>
                                                                    <a href="#"><i className="fa fa-star" /></a>
                                                                    <a href="#"><i className="fa fa-star" /></a>
                                                                    <a href="#"><i className="fa fa-star" /></a>
                                                                </div>
                                                            </div>
                                                            <div className="review-rating">
                                                                <span>Quality</span>
                                                                <div className="rating-result">
                                                                    <a href="#"><i className="fa fa-star" /></a>
                                                                    <a href="#"><i className="fa fa-star" /></a>
                                                                    <a href="#"><i className="fa fa-star" /></a>
                                                                    <a href="#"><i className="fa fa-star" /></a>
                                                                    <a href="#"><i className="fa fa-star" /></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="review-right">
                                                            <div className="review-content">
                                                                <h4>themes </h4>
                                                            </div>
                                                            <div className="review-details">
                                                                <p className="review-author">Review by<a href="#">plaza</a></p>
                                                                <p className="review-date">Posted on <span>12/9/16</span></p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <div className="review-add">
                                                    <h3>You're reviewing:</h3>
                                                    <h4>Joust Duffle Bag</h4>
                                                </div>
                                                <div className="review-field-ratings">
                                                    <span>Your Rating <sup>*</sup></span>
                                                    <div className="control">
                                                        <div className="single-control">
                                                            <span>Value</span>
                                                            <div className="review-control-vote">
                                                                <a href="#"><i className="fa fa-star" /></a>
                                                                <a href="#"><i className="fa fa-star" /></a>
                                                                <a href="#"><i className="fa fa-star" /></a>
                                                                <a href="#"><i className="fa fa-star" /></a>
                                                                <a href="#"><i className="fa fa-star" /></a>
                                                            </div>
                                                        </div>
                                                        <div className="single-control">
                                                            <span>Quality</span>
                                                            <div className="review-control-vote">
                                                                <a href="#"><i className="fa fa-star" /></a>
                                                                <a href="#"><i className="fa fa-star" /></a>
                                                                <a href="#"><i className="fa fa-star" /></a>
                                                                <a href="#"><i className="fa fa-star" /></a>
                                                                <a href="#"><i className="fa fa-star" /></a>
                                                            </div>
                                                        </div>
                                                        <div className="single-control">
                                                            <span>Price</span>
                                                            <div className="review-control-vote">
                                                                <a href="#"><i className="fa fa-star" /></a>
                                                                <a href="#"><i className="fa fa-star" /></a>
                                                                <a href="#"><i className="fa fa-star" /></a>
                                                                <a href="#"><i className="fa fa-star" /></a>
                                                                <a href="#"><i className="fa fa-star" /></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="review-form">
                                                    <div className="single-form">
                                                        <label>Nickname <sup>*</sup></label>
                                                        <form action="#">
                                                            <input type="text" />
                                                        </form>
                                                    </div>
                                                    <div className="single-form single-form-2">
                                                        <label>Summary <sup>*</sup></label>
                                                        <form action="#">
                                                            <input type="text" />
                                                        </form>
                                                    </div>
                                                    <div className="single-form">
                                                        <label>Review <sup>*</sup></label>
                                                        <form action="#">
                                                            <textarea name="massage" cols={10} rows={4} defaultValue={""} />
                                                        </form>
                                                    </div>
                                                </div>
                                                <div className="review-form-button">
                                                    <a href="#">Submit Review</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="new-book-area mt-60">
                                    <div className="section-title text-center mb-30">
                                        <h3>UPSELL PRODUCTS</h3>
                                    </div>
                                    <div className="tab-active-2 owl-carousel">
                               
                                        <div className="product-wrapper">
                                            <div className="product-img">
                                                <a href="#">
                                                    <img src={product ? "images/" + (product.productImage  ) : ""} alt="book" className="primary" />
                                                </a>
                                                <div className="quick-view">
                                                    <a className="action-view" href="#" data-target="#productModal" data-toggle="modal" title="Quick View">
                                                        <i className="fa fa-search-plus" />
                                                    </a>
                                                </div>
                                                <div className="product-flag">
                                                    <ul>
                                                        <li><span className="sale">new</span></li>
                                                        <li><span className="discount-percentage">-5%</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="product-details text-center">
                                                <div className="product-rating">
                                                    <ul>
                                                        <li><a href="#"><i className="fa fa-star" /></a></li>
                                                        <li><a href="#"><i className="fa fa-star" /></a></li>
                                                        <li><a href="#"><i className="fa fa-star" /></a></li>
                                                        <li><a href="#"><i className="fa fa-star" /></a></li>
                                                        <li><a href="#"><i className="fa fa-star" /></a></li>
                                                    </ul>
                                                </div>
                                                <h4><a href="#">Joust Duffle Bag</a></h4>
                                                <div className="product-price">
                                                    <ul>
                                                        <li>$60.00</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="product-link">
                                                <div className="product-button">
                                                    <a href="#" title="Add to cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                                </div>
                                                <div className="add-to-link">
                                                    <ul>
                                                        <li><a href="product-details.html" title="Details"><i className="fa fa-external-link" /></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-wrapper">
                                            <div className="product-img">
                                                <a href="#">
                                                    <img src="img/product/3.jpg" alt="book" className="primary" />
                                                </a>
                                                <div className="quick-view">
                                                    <a className="action-view" href="#" data-target="#productModal" data-toggle="modal" title="Quick View">
                                                        <i className="fa fa-search-plus" />
                                                    </a>
                                                </div>
                                                <div className="product-flag">
                                                    <ul>
                                                        <li><span className="sale">new</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="product-details text-center">
                                                <div className="product-rating">
                                                    <ul>
                                                        <li><a href="#"><i className="fa fa-star" /></a></li>
                                                        <li><a href="#"><i className="fa fa-star" /></a></li>
                                                        <li><a href="#"><i className="fa fa-star" /></a></li>
                                                        <li><a href="#"><i className="fa fa-star" /></a></li>
                                                        <li><a href="#"><i className="fa fa-star" /></a></li>
                                                    </ul>
                                                </div>
                                                <h4><a href="#">Chaz Kangeroo Hoodie</a></h4>
                                                <div className="product-price">
                                                    <ul>
                                                        <li>$52.00</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="product-link">
                                                <div className="product-button">
                                                    <a href="#" title="Add to cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                                </div>
                                                <div className="add-to-link">
                                                    <ul>
                                                        <li><a href="product-details.html" title="Details"><i className="fa fa-external-link" /></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-wrapper">
                                            <div className="product-img">
                                                <a href="#">
                                                    <img src="img/product/5.jpg" alt="book" className="primary" />
                                                </a>
                                                <div className="quick-view">
                                                    <a className="action-view" href="#" data-target="#productModal" data-toggle="modal" title="Quick View">
                                                        <i className="fa fa-search-plus" />
                                                    </a>
                                                </div>
                                                <div className="product-flag">
                                                    <ul>
                                                        <li><span className="discount-percentage">-5%</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="product-details text-center">
                                                <div className="product-rating">
                                                    <ul>
                                                        <li><a href="#"><i className="fa fa-star" /></a></li>
                                                        <li><a href="#"><i className="fa fa-star" /></a></li>
                                                        <li><a href="#"><i className="fa fa-star" /></a></li>
                                                        <li><a href="#"><i className="fa fa-star" /></a></li>
                                                        <li><a href="#"><i className="fa fa-star" /></a></li>
                                                    </ul>
                                                </div>
                                                <h4><a href="#">Set of Sprite Yoga Straps</a></h4>
                                                <div className="product-price">
                                                    <ul>
                                                        <li> <span>Starting at</span>$34.00</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="product-link">
                                                <div className="product-button">
                                                    <a href="#" title="Add to cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                                </div>
                                                <div className="add-to-link">
                                                    <ul>
                                                        <li><a href="product-details.html" title="Details"><i className="fa fa-external-link" /></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-wrapper">
                                            <div className="product-img">
                                                <a href="#">
                                                    <img src="img/product/7.jpg" alt="book" className="primary" />
                                                </a>
                                                <div className="quick-view">
                                                    <a className="action-view" href="#" data-target="#productModal" data-toggle="modal" title="Quick View">
                                                        <i className="fa fa-search-plus" />
                                                    </a>
                                                </div>
                                                <div className="product-flag">
                                                    <ul>
                                                        <li><span className="sale">new</span></li>
                                                        <li><span className="discount-percentage">-5%</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="product-details text-center">
                                                <div className="product-rating">
                                                    <ul>
                                                        <li><a href="#"><i className="fa fa-star" /></a></li>
                                                        <li><a href="#"><i className="fa fa-star" /></a></li>
                                                        <li><a href="#"><i className="fa fa-star" /></a></li>
                                                        <li><a href="#"><i className="fa fa-star" /></a></li>
                                                        <li><a href="#"><i className="fa fa-star" /></a></li>
                                                    </ul>
                                                </div>
                                                <h4><a href="#">Strive Shoulder Pack</a></h4>
                                                <div className="product-price">
                                                    <ul>
                                                        <li>$30.00</li>
                                                        <li className="old-price">$32.00</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="product-link">
                                                <div className="product-button">
                                                    <a href="#" title="Add to cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                                </div>
                                                <div className="add-to-link">
                                                    <ul>
                                                        <li><a href="product-details.html" title="Details"><i className="fa fa-external-link" /></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-12 order-lg-2 order-2">
                                <div className="shop-left">
                                    <div className="left-title mb-20">
                                        <h4>Related Products</h4>
                                    </div>
                                    <div className="random-area mb-30">
                                        <div className="product-active-2 owl-carousel">
                                            <div className="product-total-2">
                                                <div className="single-most-product bd mb-18">
                                                    <div className="most-product-img">
                                                        <a href="#"><img src="img/product/20.jpg" alt="book" /></a>
                                                    </div>
                                                    <div className="most-product-content">
                                                        <div className="product-rating">
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                            </ul>
                                                        </div>
                                                        <h4><a href="#">Endeavor Daytrip</a></h4>
                                                        <div className="product-price">
                                                            <ul>
                                                                <li>$30.00</li>
                                                                <li className="old-price">$33.00</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="single-most-product bd mb-18">
                                                    <div className="most-product-img">
                                                        <a href="#"><img src="img/product/21.jpg" alt="book" /></a>
                                                    </div>
                                                    <div className="most-product-content">
                                                        <div className="product-rating">
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                            </ul>
                                                        </div>
                                                        <h4><a href="#">{ product ? product.productName : ""}</a></h4>
                                                        <div className="product-price">
                                                            <ul>
                                                                <li>$30.00</li>
                                                                <li className="old-price">$35.00</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="single-most-product">
                                                    <div className="most-product-img">
                                                        <a href="#"><img src="img/product/22.jpg" alt="book" /></a>
                                                    </div>
                                                    <div className="most-product-content">
                                                        <div className="product-rating">
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                            </ul>
                                                        </div>
                                                        <h4><a href="#">Compete Track Tote</a></h4>
                                                        <div className="product-price">
                                                            <ul>
                                                                <li>$35.00</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-total-2">
                                                <div className="single-most-product bd mb-18">
                                                    <div className="most-product-img">
                                                        <a href="#"><img src="img/product/23.jpg" alt="book" /></a>
                                                    </div>
                                                    <div className="most-product-content">
                                                        <div className="product-rating">
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                            </ul>
                                                        </div>
                                                        <h4><a href="#">Voyage Yoga Bag</a></h4>
                                                        <div className="product-price">
                                                            <ul>
                                                                <li>$30.00</li>
                                                                <li className="old-price">$33.00</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="single-most-product bd mb-18">
                                                    <div className="most-product-img">
                                                        <a href="#"><img src="img/product/24.jpg" alt="book" /></a>
                                                    </div>
                                                    <div className="most-product-content">
                                                        <div className="product-rating">
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                            </ul>
                                                        </div>
                                                        <h4><a href="#">Impulse Duffle</a></h4>
                                                        <div className="product-price">
                                                            <ul>
                                                                <li>$70.00</li>
                                                                <li className="old-price">$74.00</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="single-most-product">
                                                    <div className="most-product-img">
                                                        <a href="#"><img src="img/product/22.jpg" alt="book" /></a>
                                                    </div>
                                                    <div className="most-product-content">
                                                        <div className="product-rating">
                                                            <ul>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                                <li><a href="#"><i className="fa fa-star" /></a></li>
                                                            </ul>
                                                        </div>
                                                        <h4><a href="#">Fusion Backpack</a></h4>
                                                        <div className="product-price">
                                                            <ul>
                                                                <li>$59.00</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="banner-area mb-30">
                                        <div className="banner-img-2">
                                            <a href="#"><img src="img/banner/33.jpg" alt="banner" /></a>
                                        </div>
                                    </div>
                                    <div className="left-title-2 mb-30">
                                        <h2>Compare Products</h2>
                                        <p>You have no items to compare.</p>
                                    </div>
                                    <div className="left-title-2">
                                        <h2>My Wish List</h2>
                                        <p>You have no items in your wish list.</p>
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

export default withRouter(ProductDetail);
