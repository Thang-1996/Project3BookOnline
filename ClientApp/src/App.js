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
import ProductDetail from './components/ProductDetail/ProductDetail';
import Contact from './components/Contact/Contact';
import Loading from './components/isLoading';

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
            currentUser: null,
            categories: [],
            orders: [],
            isLoading: false,
        };
        this.updateCartState = this.updateCartState.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
    }
    async componentDidMount() {
        this.setState({
            isLoading: true,
        })
        let id = 0;
        API.get(Adapter.getProducts.url)
            .then(res => {
                this.setState({
                    products: res.data,
                });
            }).catch(err => {

            });
        API.get(Adapter.getCategories.url)
            .then(res => {
                this.setState({
                    categories: res.data,
                });
            }).catch(err => {

            });
        await API.get(Adapter.currentUserInfo.url)
            .then(res => {
                id = res.data.id;
                this.setState({ currentUser: res.data })
               
            }).catch(err => {

            });
       
        API.get(Adapter.getOrderByUser.url, {
            params: {
                id: id
            }
        }).then(res => {
            this.setState({
                orders : res.data
            })
            }).catch(err => {

            });
        this.setState({
            isLoading: false,
        })
    }
 
    updateCartState() {
        let cart = localStorage.getItem("cart");
        if (cart === null) cart = [];
        else cart = JSON.parse(cart);

        this.setState({ cart: cart });
    }
    updateUser(e) {
        this.setState({ currentUser : e })
    }
    updateProduct() {
        API.get(Adapter.getProducts.url)
            .then(res => {
                this.setState({
                    products: res.data,
                });
            }).catch(err => {

            });
    }
   
    render() {
        const { products, currentUser, categories, orders } = this.state;
       
        const cart = this.state.cart;
        return (
            <Layout categories={categories} cart={cart}>
            <Route exact path='/' component={() => <Home products={products} />} />
            <Route exact path='/product' component={() => <Product categories={categories} updateCartState={this.updateCartState} cart={cart} products={products} />} />
            <Route exact path='/cart' component={() => <Cart updateCartState={this.updateCartState} cart={cart} />} />
            <Route exact path='/contact' component={() => <Contact />} />
            <Route path='/product/:id' component={() => <ProductDetail products={products} updateCartState={this.updateCartState} cart={cart} currentUser={currentUser} updateProduct={this.updateProduct} />} />
            <AuthorizeRoute path='/check-out' component={() => <Checkout currentUser={currentUser} cartState={this.updateCartState} cart={cart} />} />
            <AuthorizeRoute path='/profile' component={() => <ProFile currentUser={currentUser} updateUser={this.updateUser} orders={orders} />} />

            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            <Loading isLoading={this.state.isLoading} />
      </Layout>
    );
  }
}
