import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Adapter from '../Adapter';
import { Link } from 'react-router-dom';
import API from '../API';
import Owldemo1 from '../OwlCarousel/OwlCarousel';
import notification from '../../notification';
import ReactStars from "react-rating-stars-component";
class ProductDetail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products: props.products,
            productID: this.props.match.params.id,
            product: null,
            quantity: 1,
            currentUser: props.currentUser,
            review: {
                Message: '',
                Rate: 0,
                UserID: '',
                Status: '',
                ProductID: '',
                idUser : '',
            },
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
            }).catch (err => {

           });
        } 
    }
    ratingChanged = (newRating) => {
        let review = this.state.review;
        review.Rate = newRating;
        this.setState({ review: review })
    };
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.products !== prevState.products || nextProps.cart !== prevState.cart || nextProps.currentUser !== prevState.currentUser) {
            return {
                products: nextProps.products,
                cart: nextProps.cart,
                currentUser: nextProps.currentUser,

            };
        }
        return null;;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.products !== this.props.products || prevProps.cart !== this.props.cart || prevProps.currentUser !== this.props.currentUser) {

            this.setState({
                products: this.props.products,
                cart: this.props.cart,
                currentUser: this.props.currentUser,
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
                    alert("Hàng trong kho không đủ")
                }
                count++;
            }
        }
        if (count === 0) {
            cart.push({ product: product, quantity: quantity });
            alert("Thêm thành công")
        }

        localStorage.setItem("cart", JSON.stringify(cart));
      
        this.props.updateCartState();
    }
    changeValue = event => {
        let review = this.state.review;
        let nameValue = event.target.name;
        review[nameValue] = event.target.value;
        this.setState({ review: review })
  
    }
    sendReview = async event => {
        event.preventDefault();
        let review = this.state.review;
        let currentUser = this.state.currentUser;
        let product = this.state.product;
        review.UserID = currentUser.userName;
        review.Status = 1;
        review.idUser = currentUser.id;
       
        if (product) {
            review.ProductID = product.productID;
        }
        this.setState({ review: review });
        console.log(review);
        await API.post(Adapter.sendReview.url, review)
            .then(res => {
             
                res.data == true ? notification("success", "Đánh giá sản phẩm thành công") : notification("warning", "Cần mua sản phẩm để đánh giá")
                
            }).catch(err => {

            });
        
        this.props.updateProduct();
    }
    changeQuantity = (event) => {
        let quantity = this.state.quantity;
        quantity < 1 ? quantity = 1 : quantity = event.target.value
        this.setState({quantity : quantity})
    }
    render() {
        const { product, currentUser, review } = this.state;
        let reviewProduct = product ? product.reviewProducts : [];
        let orderProduct = product ? product.orderProducts : [];

        console.log(currentUser);
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
                                                        {
                                                            product ? product.authorProducts.map((e, index) => {
                                                                return (
                                                                    <span key={ index} className="value">Tác giả: { e.author.authorName }   |</span>
                                                                    )
                                                            }) : null
                                                        }
                                                        
                                                        <span>Tái bản lần {product ? product.reprinttimes : ""} |</span>
                                                        {
                                                            product ? product.publisherProducts.map((e, index) => {
                                                                return (
                                                                    <span key={index} className="value">Nhà xuất bản: {e.publisher.publisherName}  |</span>
                                                                )
                                                            }) : null
                                                        }
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
                                                        <a href="#">3 Reviews    |</a>
                                                        <a href="#">   Đánh giá</a>
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
                                                    </div>
                                                    <div className="product-addto-links-text">
                                                        <p>Bạn hãy NHẬP ĐỊA CHỈ nhận hàng để được dự báo thời gian & chi phí giao hàng một cách chính xác nhất. </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="left">
                                    <h4 className="BlockTitle__Wrapper-qpz3fo-0 jHTCJn">Thông tin chi tiết</h4>
                                    <div class="group">
                                    <div className="content has-table" >
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Công ty phát hành</td><td>Nhã Nam</td>
                                            </tr>
                                            <tr>
                                                <td>Ngày xuất bản</td>
                                                <td>08-2017</td>
                                            </tr>
                                            <tr>
                                                <td>Kích thước</td>
                                                <td>14 x 20.5 cm</td>
                                            </tr>
                                            <tr>
                                                <td>Dịch Giả</td>
                                                <td>Phan Thu Vân</td>
                                            </tr>
                                            <tr>
                                                <td>Loại bìa</td>
                                                <td>Bìa mềm</td>
                                            </tr>
                                            <tr>
                                                <td>Số trang</td>
                                                <td>432</td>
                                            </tr>
                                            <tr>
                                                <td>SKU</td>
                                                <td>2435793318144</td>
                                            </tr>
                                            <tr>
                                                <td>Nhà xuất bản</td>
                                                <td>Nhà Xuất Bản Thế Giới</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                    </div>
                                </div>
                                <div className="product-info-area mt-80">
                           
                                    <ul className="nav">
                                        <li><a className="active" href="#Details" data-toggle="tab">Mô tả sách</a></li>
                                        <li><a href="#Reviews" data-toggle="tab">Đánh giá</a></li>
                                    </ul>
                                    <div className="tab-content">
                                        <div className="tab-pane fade show active" id="Details">
                                            <div className="valu">
                                                <p style={{ fontSize:"16px" }}>{product ? product.productDescription : ""}</p>
                                            </div>
                                        </div>
                                        {

                                            currentUser ?
                                                <div className="tab-pane fade" id="Reviews">
                                            <div className="valu valu-2">
                                                <div className="section-title mb-60 mt-60">
                                                            <div className="review-add">
                                                                <h6>Sản phẩm: {product ? product.productName : ""}</h6>
                                                            </div>
                                                    <h2>Khách hàng đánh giá</h2>
                                                        </div>
                                                        <div className="comment-title-wrap mt-20">
                                                            <h6>{reviewProduct.length} Review</h6>
                                                        </div>
                                                        <div className="comment-reply-wrap mt-20">
                                                            <ul>
                                                                {
                                                                    reviewProduct.map((item,index) => {
                                                                        return <li key={ index}>
                                                                            <div className="public-comment">
                                                                                <div className="comment-img">
                                                                                    <a href="#"><img src="img/author/2.jpg" alt="man" /></a>
                                                                                </div>
                                                                                <div className="public-text">
                                                                                    <div className="single-comm-top">
                                                                                        <span>{item.review.userID}</span>
                                                                                        <span style={{ marginLeft: '5px' }}>{
                                                                                          item.review.reviewTime
                                                                                            

                                                                                        }</span>

                                                                                        
                                                                                        <span style={{ marginLeft: '5px', paddingTop : '5px'}} ><i style={{ fontSize: '16px', color: 'green' }} className="fa fa-check-circle"></i>Đã mua hàng </span>
                                                                                        <ReactStars
                                                                                            value={item.review.rate }
                                                                                   
                                                                                            size={24}
                                                                                            activeColor="#ffd700"
                                                                                        />,
                                                                                       
                                                                                    </div>
                                                                                    <p>{item.review.message}</p>
                                                                                </div>
                                                                            </div>
                                                                        </li>

                                                                    })

                                                                }
                                                                
                                                             
                                                            </ul>
                                                        </div>
                                         
                                                <div className="review-field-ratings">
                                                    <span>Đánh giá của bạn<sup>*</sup></span>
                                                    <div className="control">
                                                        <div className="single-control">
                                                                    <ReactStars
                                                                        count={5}
                                                                        onChange={this.ratingChanged}
                                                                        size={24}
                                                                        activeColor="#ffd700"
                                                                    />,
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="review-form">
                                                    <div className="single-form">
                                                        <label style={{ fontSize: '18px' }}>Review <sup>*</sup></label>
                                                        <form action="#">
                                                            <textarea onChange={this.changeValue} value={review.Message} name="Message" cols={10} rows={4} />
                                                        </form>
                                                    </div>
                                                </div>
                                                <button className="btn btn-primary" type="submit" onClick={this.sendReview} >Gửi đánh giá</button>
                                            </div>
                                                </div> : 
                                                <div className="tab-pane fade" id="Reviews">
                                                    <div className="valu valu-2">
                                                        <div className="section-title mb-60 mt-60">
                                                            <h2>Khách hàng đánh giá</h2>
                                                        </div>
                                                        <div className="review-add">
                                                            <h4>Sản phẩm: {product ? product.productName : ""}</h4>
                                                        </div>
                                                        <div className="review-field-ratings">
                                                                <p>Bạn phải đăng nhập để có thể đánh giá</p>
                                                        </div>
                                                 
                                                
                                                    </div>
                                                </div>


                                        }
                                  
                                    </div>
                                </div>
                                <div className="new-book-area mt-60">
                                    <Owldemo1 products={this.state.products} />
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
