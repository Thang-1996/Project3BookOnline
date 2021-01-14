﻿import React, { Component } from 'react';
import { Container} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import Adapter from './Adapter';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

   
  constructor (props) {
    super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            cart: props.cart,
            menu: "none",
      };
      this.showMenu = this.showMenu.bind(this);
    } 
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.cart !== prevState.cart) {
            return { cart: nextProps.cart };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cart !== this.props.cart) {
            //Perform some operation here
            this.setState({ cart: this.props.cart });
        }
    }
  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
    showMenu() {
        let menu = this.state.menu;
        if (menu == "none") {
            menu = "block";
        } else {
            menu = "none";
        }
        this.setState({
            menu: menu
        })
    }
    
    removeCart = (item) => {
        let cart = this.state.cart;
        let cartStorage = localStorage.getItem("cart");
        if (cartStorage === null || cartStorage.trim() === "" ) cartStorage = [];
        else cartStorage = JSON.parse(cartStorage);
        console.log(cartStorage);
   
        cart.forEach((e) => {
            if (item.productID == e.productID) {
                var index = cart.indexOf(e);
                cart.splice(index, 1);
            }
        });
        cartStorage.forEach((e) => {
            if (item.productID == e.productID) {
                var index = cartStorage.indexOf(e);
                cartStorage.splice(index, 1);
            }
        });
        localStorage.setItem('cart', JSON.stringify(cartStorage));
      
        this.setState({ cart: cart });

    }

    render() {
        const { cart } = this.state;
        let total = 0;
      return (
          <header>
              <div className="header-top-area" style={{ backgroundColor: "white!importan" }}>
                  <div className="container">
                      <div className="row">
                          <div className="col-lg-6 col-md-6 col-12">
                          </div>
                          <div className="col-lg-6 col-md-6 col-12">
                              <div className="account-area text-right">
                                  <ul>
                                      <LoginMenu></LoginMenu>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="header-mid-area" style={{ height: "0px" }}>
                  <div className="container">
                      <div className="row">
                          <div className="col-lg-3 col-md-6 col-12">
                              <div className="logo-area logo-xs-mrg-bottom">
                                  <Link to="/"><img style={{ width: "230px", position: "absolute", top: "-92px", marginLeft:"-50px" }} src="/images/logo.jpg" /></Link>
                              </div>
                          </div>
                          <div className="col-lg-6">
                              <div className="main-menu">
                             </div>
                         </div>
                          <div className="col-lg-3 col-md-3 col-12">
                              <div className="my-cart">
                                  <ul>
                                      <li style={{ position: "absolute", top: "-61px", marginLeft:"-50px" }}>
                                          <Link to="/cart"> <i className="fa fa-shopping-cart" /></Link>
                                              <span>{cart ? cart.length : 0}</span>
                                          <div className="mini-cart-sub">
                                              <div className="cart-product">
                                                  {
                                                      cart ? cart.map((e, index) => {
                                                          total += e.product.price * e.quantity;
                                                          return (
                                                              <div key={index} className="single-cart">
                                                                  <div className="cart-img">
                                                                      <a ><img src={"/images/" + e.product.productImage} />
                                                                      </a>
                                                                  </div>
                                                                  <div className="cart-info">
                                                                      <h5><a >{e.product.productName}</a></h5>
                                                                      <p>{e.quantity} x {Adapter.format_money(e.product.price)}</p>
                                                                  </div>
                                                                  <div className="cart-icon">
                                                                      <a ><i className="fa fa-remove" onClick={this.removeCart.bind(this,e)} /></a>
                                                                  </div>
                                                              </div>
                                                          )
                                                      }) : null
                                                  }
                                              </div>
                                              <div className="cart-totals">
                                                  <h5>Tổng <span>{total ? Adapter.format_money(total) : 0}</span></h5>
                                              </div>
                                              <div className="cart-bottom">
                                                  <Link className="mb-2" to="/cart"> Xem giỏ hàng</Link>
                                                  <Link to="/check-out"> Thanh toán</Link>
                                              </div>
                                          </div>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="header-bottom-area mb-3 mt-5" style={{ backgroundColor: "f8f7f7", fontSize: "18px" }}>
                  <div className="container">
                      <div className="row">
                          <div className="col-lg-12 col-md-12">
                              <nav className="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: "f8f7f7", fontSize: "18px" }}>
                                  <Link to="/">Trang chủ</Link>
                                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                      <span className="navbar-toggler-icon" />
                                  </button>
                                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                      <ul className="navbar-nav mr-auto">
                                          <li className="nav-item dropdown active ml-5">
                                             
                                                  <Link to="/" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Thể loại</Link>
                                              
                                              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                  <Link className="dropdown-item" to="/product">Sách</Link>
                                                  <a className="dropdown-item" href="#">Another action</a>
                                                  <a className="dropdown-item" href="#">Something else here</a>
                                              </div>
                                          </li>
                                          <li className="nav-item active ml-5">
                                              <a className="nav-link" href="#">Liên hệ <span className="sr-only">(current)</span></a>
                                          </li>
                                          <li className="nav-item active ml-5">
                                              <a className="nav-link" href="#">Blog</a>
                                          </li>
                                          
                                      </ul>
                                      <div className="header-bottom-search">
                                          <form action="#">
                                              <input type="text" placeholder="Tìm kiếm ..." />
                                              <a href="#"><i className="fa fa-search" /></a>
                                          </form>
                                          <div className="pos-search">
                                              <select className="bootstrap-select">
                                                  <option value={0}>Thể loại</option>
                                                  <option> Book </option>
                                                  <option> - - Tops </option>
                                                  <option> - - - - Casual Shirts </option>
                                                  <option> - - - - Dress Shirts </option>
                                                  <option> - - - - Sweaters </option>
                                                  <option> - - - - Fleece, Hendleys </option>
                                                  <option> - - - - Suits </option>
                                                  <option> - - Bottems </option>
                                                  <option> - - - - Chinos </option>
                                                  <option> - - - - Dress Pants </option>
                                                  <option> - - - - Corduroy </option>
                                                  <option> - - - - Denim </option>
                                                  <option> - - - - Limited Edition </option>
                                                  <option> Book </option>
                                                  <option> - - Tops </option>
                                                  <option> - - - - Casual Shirts </option>
                                                  <option> - - - - Dress Shirts </option>
                                                  <option> - - - - Sweaters </option>
                                                  <option> - - - - Fleece, Hendleys </option>
                                                  <option> - - - - Suits </option>
                                                  <option> - - Bottems </option>
                                                  <option> - - - - Chinos </option>
                                                  <option> - - - - Dress Pants </option>
                                                  <option> - - - - Corduroy </option>
                                                  <option> - - - - Denim </option>
                                                  <option> - - - - Limited Edition </option>
                                              </select>
                                          </div>
                                      </div>
                                  </div>
                              </nav>
                          </div>
                          
                      </div>
                  </div>
              </div>
      
      </header>
    );
  }
}
