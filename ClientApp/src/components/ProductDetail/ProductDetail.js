import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Adapter from '../Adapter';
import { Link } from 'react-router-dom';
import API from '../API';
import Owldemo1 from '../OwlCarousel/OwlCarousel';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: props.products,
            productID: this.props.match.params.id,
            product: null,
            quantity: 1
        };
        
   
        this.addToCart = this.addToCart.bind(this);
    }
   async componentDidMount() {
       let products = this.state.products;
       let product = {};
       await products.find((item) => {
           if (this.state.productID == item.productID) {
               product = item
                this.setState({
                    product: item,
                })
            }
        });
            if (product !== null) {
                API.get(Adapter.getCategoriesID.url, {
                    params: {
                        id: product.categoryID
                    }
                }).then(res => {
                    this.setState({
                        products: res.data,
                    });
                    console.log(res.data)
            }).catch (err => {

           });
        } 
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.products !== prevState.products || nextProps.cart !== prevState.cart) {
            return {
                products: nextProps.products,
                cart: nextProps.cart,
            };
        }
        return null;;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.products !== this.props.products || prevProps.cart !== this.props.cart) {

            this.setState({
                products: this.props.products,
                cart: this.props.cart,
            });
        }
    }
  
    addToCart() {
        const product = this.state.product;
        let quantity = this.state.quantity;
        let cart = localStorage.getItem("cart");
        if (cart === null || cart.trim() === "") cart = [];
        else cart = JSON.parse(cart);
        let count = 0;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].product.productID === product.productID) {
                if (cart[i].quantity < product.quantity) {
                   cart[i].quantity += Number(quantity);
                } else {
                    alert("Hàng trong kho không đủ");
                }
                count++;
            }
        }
        if (count === 0) {
            cart.push({ product: product, quantity: quantity });
            alert("Thêm hàng vào giỏ thành công")
        }

        localStorage.setItem("cart", JSON.stringify(cart));


        this.props.updateCartState();
    }

    changeQuantity = (event) => {
        let quantity = this.state.quantity;
        quantity < 1 ? quantity = 1 : quantity = event.target.value
        this.setState({quantity : quantity})
    }

    render() {
        const { product, products } = this.state;
       /* console.log(product);
        console.log(products)*/
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
                                                <img  src={product ? "images/" + (product.productImage) : ""} alt="woman" />
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
                                                            <input className="qty" value={this.state.quantity} onChange={this.changeQuantity} type="number" />
                                                        </div>
                                                        <a onClick={this.addToCart} style={{ cursor: "pointer", color:"white" }} title="Add to cart" >Thêm vào giỏ hàng</a>
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
                                <div class="new-book-area mt-60">
                                    <Owldemo1/>
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
