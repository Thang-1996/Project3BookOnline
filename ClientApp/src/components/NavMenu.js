import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Adapter from './Adapter';
import API from './API';
import Loading from './isLoading';
export class NavMenu extends Component {
    static displayName = NavMenu.name;
    constructor(props) {
      super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            cart: props.cart,
            menu: "none",
            category: [],
            key: "",
            products: [],
            search: "hidden",
            searchData: [],
            currentUser: null,
            isLoading: false,
      };
      this.showMenu = this.showMenu.bind(this);
    } 
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.cart !== prevState.cart ) {
            return {
                cart: nextProps.cart,
                categories: nextProps.categories,
                currentUser: nextProps.currentUser,

            };
        }
        return null;
    }
    async componentDidMount() {
        await API.get(Adapter.reactAPICall.url)
            .then(res => {
                this.setState({
                    category: res.data.categories,
                    products : res.data.products
                })
            }).catch(err => {

            });
        API.get(Adapter.reactAPICallWithUser.url)
            .then(res => {
                this.setState({
                    currentUser: res.data.currentUser,
                })
            }).catch(err => {

            });
    
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cart !== this.props.cart) {
            //Perform some operation here
            this.setState({
                cart: this.props.cart,
                currentUser: this.props.currentUser,

              
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
    searchProduct = (e) => {
        this.setState({
            key: e.target.value,
        })
    }
    hiddenSearch = (e) => {
        this.setState({
            search: "hidden",
        })
    }
    handleSearch = (e) => {
        if (e.key === 'Enter') {
            let products = this.state.products;
            let key = this.state.key;
            const lowercasedFilter = Adapter.removeVietnameseTones(key).toLowerCase();
            const filteredData = products.filter(item => {
                return Object.keys(item).some(key =>
                    Adapter.removeVietnameseTones(item.productName).toLowerCase().includes(lowercasedFilter),
                );
            });
            const filteredData1 = [];
            for (let i = 0; i < products.length; i++) {
                let filterData3 = [];
                filterData3 = products[i].authorProducts.filter(item => {
                    return Object.keys(item).some(key =>
                        Adapter.removeVietnameseTones(item.author.authorName).toLowerCase().includes(lowercasedFilter),
                    );
                });
                if (filterData3.length != 0) {
                    filteredData1.push(filterData3[0])
                }
            }
            let pp = filteredData1.filter((ele, ind) => ind === filteredData1.findIndex(elem => elem.authorID === ele.authorID))
            let filteredData4 = [];
            for (let j = 0; j < pp.length; j++) {
                for (let k = 0; k < pp[j].author.authorProducts.length; k++) {
                    filteredData4.push(pp[j].author.authorProducts[k].product);
                }

            }
            let filterData5 = filteredData4.concat(filteredData);
            let filterData6 = filterData5.filter((ele, ind) => ind === filterData5.findIndex(elem => elem.productID === ele.productID))
            
            this.setState({
                searchData: filterData6,
                search: "visible",
            })
        }
    }
    handleSearch2 = (e) => {
        let products = this.state.products;
        let key = this.state.key;
        const lowercasedFilter = Adapter.removeVietnameseTones(key).toLowerCase();
        const filteredData = products.filter(item => {
            return Object.keys(item).some(key =>
                Adapter.removeVietnameseTones(item.productName).toLowerCase().includes(lowercasedFilter),
            );
        });
        const filteredData1 = [];
        for (let i = 0; i < products.length; i++) {
            let filterData3 = [];
            filterData3 = products[i].authorProducts.filter(item => {
                return Object.keys(item).some(key =>
                    Adapter.removeVietnameseTones(item.author.authorName).toLowerCase().includes(lowercasedFilter),
                );
            });
            if (filterData3.length != 0) {
                filteredData1.push(filterData3[0])
            }
        }
        let pp = filteredData1.filter((ele, ind) => ind === filteredData1.findIndex(elem => elem.authorID === ele.authorID))
        let filteredData4 = [];
        for (let j = 0; j < pp.length; j++) {
            for (let k = 0; k < pp[j].author.authorProducts.length; k++) {
                filteredData4.push(pp[j].author.authorProducts[k].product);
            }
            
        }
        let filterData5 = filteredData4.concat(filteredData);
        let filterData6 = filterData5.filter((ele, ind) => ind === filterData5.findIndex(elem => elem.productID === ele.productID))
        this.setState({
            searchData: filterData6,
            search: "visible",
        })
    }
    logOut = () => {
        this.setState({
            isLoading: true,
        })
        const returnUrl = {
            returnUrl : '/'
        };
        API.post(Adapter.logOut.url, returnUrl)
        .then(res => {
            if (res.status == 200) {
                window.location.href = "/";
                this.setState({ isLoading : false });
            }
        }).catch({

        });
    }
   
    render() {
        const { cart, category, searchData, currentUser } = this.state;
        let total = 0;
        console.log(currentUser);

      return (
          <header>
            
              <div className="header-top-area" style={{ backgroundColor: "white!importan" }}>
                  <div className="container">
                      <div className="row">
                          <div className="col-lg-6 col-md-6 col-12">
                          </div>
                          <div className="col-lg-6 col-md-6 col-12">
                              <div className="account-area text-right">
                                 
                                      {
                                          !currentUser ? 
                                          <ul style={{ margin: '10px 10px 10px 0' }}>
                                              <li><a href="/Identity/Account/Login">LOGIN</a></li>
                                              <li><a href="/Identity/Account/Register">REGISTER</a></li>
                                          </ul>
                                          :
                                          <ul style={{ margin: '10px 10px 10px 0' }}>
                                              <li>HELLO, <Link to="/profile">{currentUser ? (currentUser.name ? currentUser.name : 'Bạn') : ''}</Link></li>
                                              <li> <a onClick={this.logOut}>LOG OUT</a></li>
                                          </ul>

                                      }
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
                                                  <h5>Total <span>{total ? Adapter.format_money(total) : 0}</span></h5>
                                              </div>
                                              <div className="cart-bottom">
                                                  <Link className="mb-2" to="/cart"> VIEW CART</Link>
                                                  <Link to="/check-out"> CHECK OUT</Link>
                                              </div>
                                          </div>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="header-bottom-area" style={{ backgroundColor: "f8f7f7", fontSize: "18px", marginTop: "0rem!important"}}>
                  <div className="container">
                      <div className="row">
                          <div className="col-lg-12 col-md-12">
                              <nav className="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: "f8f7f7", fontSize: "17px" }}>
                                  <Link to="/" style={{ marginLeft: "-15px", color: "black" }}>HOME</Link>
                                  <div className="collapse navbar-collapse nav-item dropdown active ml-5" id="navbarSupportedContent">
                                      <ul className="navbar-nav mr-auto">
                                          <li className="dropdown ">
                                              <Link to="/product" className="nav-link dropdown-toggle " data-toggle="dropdown">CATEGORIES<b className="caret" /></Link>
                                              <ul className="dropdown-menu mega-menu">
                                                  {
                                                      category ? category.map((e, index) => {
                                                          return <li key={ index} className="mega-menu-column">
                                                              <ul>
                                                                  <Link to={"/category/" + e.categoryID} style={{color: "black" }} className="nav-header">{e.categoryName}</Link>
                                                              </ul>
                                                          </li>
                                                      }) : null
                                                  }
                                              </ul>
                                          </li>{/* /.dropdown */}
                                          <li className="nav-item active ml-5">
                                              <Link className="nav-link" to="/contact">CONTACT<span className="sr-only">(current)</span></Link>
                                          </li>
                                          <li className="nav-item active ml-5">
                                              <Link className="nav-link" to="/blog">BLOG</Link>
                                          </li>
                                      </ul>
                                      <div className="header-bottom-search">
                                          <input className="form-control" style={{ marginRight:"70px" }} onKeyDown={this.handleSearch} onChange={this.searchProduct} type="text" defaultValue={this.state.key} placeholder="SEARCH ..." />
                                          <a onClick={this.handleSearch2}><i style={{ color: "black", position: "absolute", top: "10px", right: "10px", cursor: "pointer" }} className="fa fa-search" /></a>
                                          <table className="table" style={{ position: "absolute", zIndex: "100", backgroundColor: "white", width: "600px", visibility: this.state.search, left: "-200px" }}>
                                              <thead>
                                                  <tr>
                                                      <th style={{ whiteSpace: "nowrap"}}>STT</th>
                                                      <th style={{ whiteSpace: "nowrap" }}>BOOK NAME</th>
                                                      <th style={{ whiteSpace: "nowrap" }}>PICTURE</th>
                                                      <th style={{ whiteSpace: "nowrap" }}>PRICE</th>
                                                      <th style={{ whiteSpace: "nowrap" }}>DETAILS</th>
                                                      <th onClick={this.hiddenSearch} style={{ position: "absolute", right: "-5px", top: "-14px", border: "none", cursor: "pointer" }}>X </th>
                                                  </tr>
                                              </thead>
                                              <tbody>
                                                  {
                                                      searchData ? searchData.map((e, index) => {
                                                          return (
                                                              <tr key={ index}>
                                                                  <td>{++index}</td>
                                                                  <td>{e.productName}</td>
                                                                  <td><img src={"/images/" + e.productImage} style={{ width: "100px", height: "100px" }} /></td>
                                                                  <td>{Adapter.format_money(e.price)}</td>
                                                                
                                                                  <td><Link onClick={this.hiddenSearch } style={{ cursor: "pointer" }} to={"/product/" + e.productID}> VIEW </Link></td>
                                                              </tr>
                                                              )
                                                      }) : null
                                                  }
                                                  
                                              </tbody>

                                          </table>
                                          
                                      </div>
                                  </div>
                              </nav>
                          </div>
                          
                      </div>
                  </div>
              </div>
              <Loading isLoading={this.state.isLoading} />
      </header>
    );
  }
}
