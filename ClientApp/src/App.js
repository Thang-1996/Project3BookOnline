import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';
import Adapter from './components/Adapter';
import API from './components/API';
import Checkout from './components/Checkout/Checkout';
import ProFile from './components/Profile/ProFile';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Contact from './components/Contact/Contact';
import Loading from './components/isLoading';
import WishList from './components/WishList/WishList';

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
            wishlist : [],
        
        };
        this.updateCartState = this.updateCartState.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
    }
    async  componentDidMount() {
        this.setState({
            isLoading: true,
        })
            await API.get(Adapter.reactAPICall.url)
            .then(res => {
                this.setState({
                    products: res.data.products,
                   
                    categories: res.data.categories,
                   
                })
            }).catch(err => {

            })
            API.get(Adapter.reactAPICallWithUser.url)
            .then(res => {
                this.setState({
                    currentUser: res.data.currentUser,
                    orders: res.data.orders,
                })
            }).catch(err => {

            })
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
     updateWishList = () => {
        let id = 0;
        let currentUser = this.state.currentUser;
        if (currentUser) {
            id = currentUser.id;
        }
         API.get(Adapter.getWishList.url, {
            params: {
                id: id
            }
        }).then(res => {
            this.setState({
                wishlist: res.data
            })
        }).catch(err => {

        });
    }
    refresh = (e) => {
        this.setState({ products : e })
    }

   
    render() {

        const { products, currentUser, categories, orders, wishlist } = this.state;
        console.log(this.state);

        const cart = this.state.cart;
        return (
            <Layout currentUser={currentUser} categories={categories} cart={cart}>
                <Route exact path='/' component={() => <Home products={products} />} />
                <Route exact path='/product' component={() => <Product categories={categories} currentUser={currentUser} updateCartState={this.updateCartState} cart={cart} products={products} refresh={this.refresh} />} />
            <Route exact path='/category/:categoryid' component={() => <Product categories={categories} updateCartState={this.updateCartState} cart={cart} products={products} />} />
            <Route exact path='/cart' component={() => <Cart updateCartState={this.updateCartState} cart={cart} />} />
            <Route exact path='/contact' component={() => <Contact />} />
                <Route path='/product/:id' component={() => <ProductDetail products={products} updateCartState={this.updateCartState} cart={cart} currentUser={currentUser} updateProduct={this.updateProduct} />} />
                <Route path='/check-out' component={() => <Checkout currentUser={currentUser} cartState={this.updateCartState} cart={cart} updateProduct={this.updateProduct} />} />
                <Route path='/profile' component={() => <ProFile currentUser={currentUser} updateUser={this.updateUser} orders={orders} />} />
                <Route path='/wishlist' component={() => <WishList currentUser={currentUser} updateCartState={this.updateCartState} updateWishList={this.updateWishList} />} />
           

            <Loading isLoading={this.state.isLoading} />
      </Layout>
    );
  }
}
