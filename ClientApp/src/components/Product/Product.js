import React, {Component} from 'react';
import ProductItems from './components/ProductItems';
import { Link } from 'react-router-dom';
import API from '../API';
import Adapter from '../Adapter';
export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: props.cart,
            products: props.products,
            categories: props.categories,
        };
        this.updateCartState = this.updateCartState.bind(this);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.cart !== prevState.cart) {
            return {
                cart: nextProps.cart,
            };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cart !== this.props.cart) {
            this.setState({
                cart: this.props.cart,
            });
        }
    }
    updateCartState() {
        this.props.updateCartState();
    }
    selectCategory = (item) => {
         API.get(Adapter.getCategoriesID.url, {
            params: {
                id: item
            }
        }).then(res => {
                this.setState({
                    products: res.data,
                });
                console.log(res.data);
                console.log(this.state.products)
            }).catch(err => {

            });
    }
  /*  sortOnKey = (key, string, desc) => {
        const caseInsensitive = string && string === "CI";
        return (a, b) => {
            a = caseInsensitive ? a[key].toLowerCase() : a[key];
            b = caseInsensitive ? b[key].toLowerCase() : b[key];
            if (string) {
                return desc ? b.localeCompare(a) : a.localeCompare(b);
            }
            return desc ? b - a : a - b;
        }
    };*/
    sortProduct = async (event) => {
        let value = event.target.value;
        let products = this.state.products;

        switch (value) {
            case "priceUp":
                await products.sort(function (a, b) {
                    return parseFloat(a.price) - parseFloat(b.price);
                });
                break;
            case "priceDown":
                await products.sort(function (a, b) {
                    return -parseFloat(a.price) + parseFloat(b.price);
                });
                break;
            case "nameAZ":
                products.sort(function (a, b) {
                    if (a.productName < b.productName) { return -1; }
                    if (a.productName > b.productName) { return 1; }
                    return 0;
                })
                break;
            case "nameZA":
                products.sort(function (a, b) {
                    if (a.productName < b.productName) { return 1; }
                    if (a.productName > b.productName) { return -1; }
                    return 0;
                })
                break;
            case "count":
                break;
            case "view":
                break;
            default:
                break;
        }
        this.setState({
            products: products,
        })
    }
    render() {
        let { products, categories } = this.state;
        let count = 0;
        return (
            <div>
                <div className="breadcrumbs-area mb-70">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumbs-menu">
                                    <ul>
                                        <li><Link to="/">Trang chủ</Link></li>
                                        <li><a className="active">Sản phẩm</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           
                <div className="shop-main-area mb-70">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-12 col-12 order-lg-1 order-2 mt-sm-50 mt-xs-40">
                                <div className="shop-left">
                                    <div className="left-title mb-20">
                                        <h4>Các thể loại sách</h4>
                                    </div>
                                    <div className="left-menu mb-30">
                                        <ul>
                                            {
                                                categories ? categories.map((e, index) => {
                                                    return <li key={index}><a onClick={this.selectCategory.bind(this, e.categoryID)} style={{cursor: "pointer"}}>{e.categoryName}</a></li>
                                                }) : null
                                            }
                                            
                                        
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-12 col-12 order-lg-2 order-1">
                                <div className="category-image mb-30">
                                    <a><img src="img/banner/32.jpg" alt="banner" /></a>
                                </div>
                                <div className="toolbar mb-30">
                                    <div className="toolbar-sorter">
                                        <span>Lọc theo</span>
                                        <select onChange={ this.sortProduct} id="sorter" className="sorter-options" data-role="sorter">
                                            <option value="nameAZ">Tên sản phẩm A-Z</option>
                                            <option value="nameZA">Tên sản phẩm Z-A</option>
                                            <option value="priceUp">Giá tiền từ thấp đến cao</option>
                                            <option value="priceDown">Giá tiền từ cao đến thấp</option>
                                            <option value="count">Bán chạy</option>
                                            <option value="view">Phổ biến</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="th">
                                        <div className="row">
                                            {
                                                products ? products.map((product, index) => {
                                                    count++;
                                                    return <ProductItems updateCartState={this.updateCartState} product={product} key={index} />
                                                }) : null
                                            }
                                    
                                      
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="list">
                                     
                                        <div className="single-shop mb-30">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-12">
                                                    <div className="product-wrapper-2">
                                                        <div className="product-img">
                                                            <a >
                                                                <img src="img/product/3.jpg" alt="book" className="primary" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-8 col-md-8 col-12">
                                                    <div className="product-wrapper-content">
                                                        <div className="product-details">
                                                            <div className="product-rating">
                                                                <ul>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                </ul>
                                                            </div>
                                                            <h4><a>Crown Summit</a></h4>
                                                            <div className="product-price">
                                                                <ul>
                                                                    <li>$36.00</li>
                                                                    <li className="old-price">$38.00</li>
                                                                </ul>
                                                            </div>
                                                            <p>The sporty Joust Duffle Bag can't be beat - not in the gym, not on the luggage carousel, not anywhere. Big enough to haul a basketball or soccer ball and some sneakers with plenty of room to spare,... </p>
                                                        </div>
                                                        <div className="product-link">
                                                            <div className="product-button">
                                                                <a  title="Add to cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                                            </div>
                                                            <div className="add-to-link">
                                                                <ul>
                                                                    <li><a title="Details"><i className="fa fa-external-link" /></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                        <div className="single-shop mb-30">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-12">
                                                    <div className="product-wrapper-2">
                                                        <div className="product-img">
                                                            <a>
                                                                <img src="img/product/18.jpg" alt="book" className="primary" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-8 col-md-8 col-12">
                                                    <div className="product-wrapper-content">
                                                        <div className="product-details">
                                                            <div className="product-rating">
                                                                <ul>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                </ul>
                                                            </div>
                                                            <h4><a >Driven Backpack</a></h4>
                                                            <div className="product-price">
                                                                <ul>
                                                                    <li>$34.00</li>
                                                                    <li className="old-price">$36.00</li>
                                                                </ul>
                                                            </div>
                                                            <p>The sporty Joust Duffle Bag can't be beat - not in the gym, not on the luggage carousel, not anywhere. Big enough to haul a basketball or soccer ball and some sneakers with plenty of room to spare,... </p>
                                                        </div>
                                                        <div className="product-link">
                                                            <div className="product-button">
                                                                <a  title="Add to cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                                            </div>
                                                            <div className="add-to-link">
                                                                <ul>
                                                                    <li><a  title="Details"><i className="fa fa-external-link" /></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                        <div className="single-shop mb-30">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-12">
                                                    <div className="product-wrapper-2">
                                                        <div className="product-img">
                                                            <a >
                                                                <img src="img/product/10.jpg" alt="book" className="primary" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-8 col-md-8 col-12">
                                                    <div className="product-wrapper-content">
                                                        <div className="product-details">
                                                            <div className="product-rating">
                                                                <ul>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                </ul>
                                                            </div>
                                                            <h4><a>Fusion Backpack</a></h4>
                                                            <div className="product-price">
                                                                <ul>
                                                                    <li>$59.00</li>
                                                                </ul>
                                                            </div>
                                                            <p>The sporty Joust Duffle Bag can't be beat - not in the gym, not on the luggage carousel, not anywhere. Big enough to haul a basketball or soccer ball and some sneakers with plenty of room to spare,... </p>
                                                        </div>
                                                        <div className="product-link">
                                                            <div className="product-button">
                                                                <a title="Add to cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                                            </div>
                                                            <div className="add-to-link">
                                                                <ul>
                                                                    <li><a title="Details"><i className="fa fa-external-link" /></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                     
                                        <div className="single-shop mb-30">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-12">
                                                    <div className="product-wrapper-2">
                                                        <div className="product-img">
                                                            <a>
                                                                <img src="img/product/5.jpg" alt="book" className="primary" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-8 col-md-8 col-12">
                                                    <div className="product-wrapper-content">
                                                        <div className="product-details">
                                                            <div className="product-rating">
                                                                <ul>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                </ul>
                                                            </div>
                                                            <h4><a >Set of Sprite Yoga Straps</a></h4>
                                                            <div className="product-price">
                                                                <ul>
                                                                    <li> <span>Starting at</span>$34.00</li>
                                                                </ul>
                                                            </div>
                                                            <p>The sporty Joust Duffle Bag can't be beat - not in the gym, not on the luggage carousel, not anywhere. Big enough to haul a basketball or soccer ball and some sneakers with plenty of room to spare,... </p>
                                                        </div>
                                                        <div className="product-link">
                                                            <div className="product-button">
                                                                <a title="Add to cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                                            </div>
                                                            <div className="add-to-link">
                                                                <ul>
                                                                    <li><a  title="Details"><i className="fa fa-external-link" /></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                      
                                        <div className="single-shop">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-12">
                                                    <div className="product-wrapper-2">
                                                        <div className="product-img">
                                                            <a>
                                                                <img src="img/product/19.jpg" alt="book" className="primary" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-8 col-md-8 col-12">
                                                    <div className="product-wrapper-content">
                                                        <div className="product-details">
                                                            <div className="product-rating">
                                                                <ul>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                    <li><a ><i className="fa fa-star" /></a></li>
                                                                </ul>
                                                            </div>
                                                            <h4><a >Compete Track Tote</a></h4>
                                                            <div className="product-price">
                                                                <ul>
                                                                    <li>$32.00</li>
                                                                </ul>
                                                            </div>
                                                            <p>The sporty Joust Duffle Bag can't be beat - not in the gym, not on the luggage carousel, not anywhere. Big enough to haul a basketball or soccer ball and some sneakers with plenty of room to spare,... </p>
                                                        </div>
                                                        <div className="product-link">
                                                            <div className="product-button">
                                                                <a title="Add to cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                                            </div>
                                                            <div className="add-to-link">
                                                                <ul>
                                                                    <li><a  title="Details"><i className="fa fa-external-link" /></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                             
                                <div className="pagination-area mt-50">
                                    <div className="list-page-2">
                                        <p>Items 1-9 of {count }</p>
                                    </div>
                                    <div className="page-number">
                                        <ul>
                                            <li><a  className="active">1</a></li>
                                            <li><a >2</a></li>
                                            <li><a >3</a></li>
                                            <li><a >4</a></li>
                                            <li><a  className="angle"><i className="fa fa-angle-right" /></a></li>
                                        </ul>
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
