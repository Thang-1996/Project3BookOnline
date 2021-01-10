import React, { Component } from 'react';
import { Container} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';

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
        if (cartStorage === null) cartStorage = [];
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
              <div className="header-top-area" style={{ backgroundColor: "f8f7f7!importan" }}>
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
              <div className="header-mid-area">
                  <div className="container">
                      <div className="row">
                          <div className="col-lg-3 col-md-6 col-12">
                              <div className="logo-area logo-xs-mrg-bottom">
                                  <Link to="/"><img style={{ width: "230px", position: "absolute", top: "-92px" }} src="img/logo/logo.png" /></Link>
                              </div>
                          </div>
                          <div className="col-lg-6">
                              <div className="main-menu">
                             </div>
                         </div>
                          <div className="col-lg-3 col-md-3 col-12">
                              <div className="my-cart">
                                  <ul>
                                      <li style={{position: "absolute", top: "-61px"}}>
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
                                                                      <p>{e.quantity} x {e.product.price}</p>
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
                                                  <h5>Tổng <span>{total ? total : 0}</span></h5>
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
              <div className="header-bottom-area" style={{ backgroundColor: "f8f7f7" }}>
                  <div className="container">
                      <div className="row">
                          <div className="col-lg-3 col-md-4">
                              <div className="category-area category-mb">
                                  <h3><a style={{ color: "white", cursor: "pointer" }} onClick={this.showMenu} id="showcat">Menu <i className="fa fa-bars" /></a></h3>
                                  <div className="category-menu category-menu-1" id="hidecat" style={{ display: this.state.menu }}>
                                      <nav className="menu">
                                          <ul>
                                              <li className="cr-dropdown"><Link to="/product">Sách</Link>
                                               
                                              </li>
                                              <li className="cr-dropdown"><Link to="/blog">Blog</Link>
                                            
                                              </li>
                                              <li><Link to="/lienhe">Liên hệ</Link></li>
                                              <li><Link to="/vechungtoi">Về chúng tôi</Link></li>
                                          </ul>
                                      </nav>
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-9 col-md-8">
                              <div className="header-bottom-search">
                                  <form action="#">
                                      <input type="text" placeholder="Tìm cuốn sách mà bạn muốn..." />
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
                      </div>
                  </div>
              </div>
      
      </header>
    );
  }
}
