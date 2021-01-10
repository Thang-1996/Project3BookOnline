import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';
import Adapter from './components/Adapter';
import API from './components/API';
import Checkout from './components/Checkout/Checkout';
import ProFile from './components/Profile/ProFile';

export default class App extends Component {
    static displayName = App.name;
    constructor(props) {
        super(props);

        let cart = localStorage.getItem("cart");

        if (cart === null || cart.trim() === "") cart = [];
        else cart = JSON.parse(cart);

        this.state = {
            cart: cart,
            products: [],
            currentUser : null,
        };
        this.updateCartState = this.updateCartState.bind(this);
    }
    componentDidMount() {
        API.get(Adapter.getProducts.url)
            .then(res => {
                this.setState({
                    products: res.data,
                });
            }).catch(err => {

            });
        API.get(Adapter.currentUserInfo.url)
            .then(res => {
              
                this.setState({ currentUser : res.data })
            }).catch(err => {

            });
        API.get(Adapter.getOrders.url)
            .then(res => {
            }).catch(err => {

            });
        // test by userID
        API.get(Adapter.getOrderByUser.url, {
            params: {
                id: "97d042fa-267d-48d1-b703-ef54e760af0c"
            }
        })
            .then(res => {
                console.log(res.data);
            }).catch(err => {

            });
    }
 
    updateCartState() {
        let cart = localStorage.getItem("cart");
        if (cart === null) cart = [];
        else cart = JSON.parse(cart);

        this.setState({ cart: cart });
    }
   
    render() {
        const { products, currentUser } = this.state;
        const cart = this.state.cart;
    return (
        <Layout cart={cart}>
            <Route exact path='/' component={Home} />
            <Route exact path='/product' component={() => <Product updateCartState={this.updateCartState } cart={ cart} products={products} />} />
            <Route exact path='/cart' component={() => <Cart updateCartState={this.updateCartState} cart={cart} />} />
            <AuthorizeRoute path='/check-out' component={() => <Checkout currentUser={currentUser} updateCartState={this.updateCartState} cart={cart} />} />
            <AuthorizeRoute path='/profile' component={() => <ProFile currentUser={currentUser} />} />

            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}