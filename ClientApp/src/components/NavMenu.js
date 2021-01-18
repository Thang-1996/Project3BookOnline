import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import Adapter from './Adapter';
import API from './API';
export class NavMenu extends Component {
    static displayName = NavMenu.name;
    constructor(props) {
      super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            cart: props.cart,
            menu: "none",
            category : [],
      };
      this.showMenu = this.showMenu.bind(this);
    } 
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.cart !== prevState.cart ) {
            return {
                cart: nextProps.cart,
                categories: nextProps.categories,

            };
        }
        return null;
    }
    async componentDidMount() {
        await API.get(Adapter.getCategories.url)
            .then(res => {
                this.setState({
                    category: res.data
                })
            }).catch(err => {

            })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cart !== this.props.cart) {
            //Perform some operation here
            this.setState({
                cart: this.props.cart,
              
            });
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
        const { cart, category } = this.state;
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
                                  <Link to="/"><img style={{ width: "230px", position: "absolute", top: "-89px", marginLeft:"-64px" }} src="/images/logo1.png" /></Link>
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
              <div className="header-bottom-area mb-3 " style={{ backgroundColor: "f8f7f7", fontSize: "18px", marginTop: "0rem!important"}}>
                  <div className="container">
                      <div className="row">
                          <div className="col-lg-12 col-md-12">
                              <nav className="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: "f8f7f7", fontSize: "17px" }}>
                                  <Link to="/" style={{ marginLeft:"-15px" }}>Trang chủ</Link>
                                  <div className="collapse navbar-collapse nav-item dropdown active ml-5" id="navbarSupportedContent">
                                      <ul className="navbar-nav mr-auto">
                                          <li className="dropdown ">
                                              <Link to="/product" className="nav-link dropdown-toggle " data-toggle="dropdown">Thể Loại <b className="caret" /></Link>
                                              <ul className="dropdown-menu mega-menu">
                                                  {
                                                      category ? category.map((e, index) => {
                                                          return <li key={ index} className="mega-menu-column">
                                                              <ul>
                                                                  <Link to="" className="nav-header">{e.categoryName}</Link>
                                                              </ul>
                                                          </li>
                                                      }) : null
                                                  }
                                              </ul>
                                          </li>{/* /.dropdown */}
                                          <li className="nav-item active ml-5">
                                              <Link className="nav-link" to="/contact">Liên hệ <span className="sr-only">(current)</span></Link>
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
