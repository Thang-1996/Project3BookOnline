import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import notification from '../../notification';
import Adapter from '../Adapter';
import API from '../API';
export default class WishList extends Component {
    constructor(props) {
        super(props);
     
        this.state = {
            wishlist: [],
        };
       
    }
     componentDidMount() {
        let currentUser = this.props.currentUser;
        let id = 0;
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
  
    addToCart = (item) => {
    
        if (Number(item.product.quantity) == 0) {
            alert("Inventory is not enough");
        } else {
            let cart = localStorage.getItem("cart");
            if (cart === null) cart = [];
            else cart = JSON.parse(cart);
            let count = 0;
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].product.productID === item.product.productID) {
                    if (cart[i].quantity < Number(item.product.quantity) || Number(item.product.quantity) != 0) {
                        cart[i].quantity++;
                    } else {
                        alert("Inventory is not enough");
                    }
                    count++;
                }
            }
            if (count === 0) {
                cart.push({ product: item.product, quantity: 1 });
                alert("Add items to cart successfully")
            }
            localStorage.setItem("cart", JSON.stringify(cart));

            this.props.updateCartState();
        }
        
    }
    removeWishLish = async (item) => {
        await API.post(Adapter.deleteWishList.url, item)
            .then(res => {
                console.log(res.data);
                if (res.data == true) {
                    notification('success', 'Successfully deleted the product');
                }
                this.props.updateWishList();
            }).catch(err => {

            })
    }
    render() {
        const { wishlist } = this.state;
        
 
     
        return (
            <div>
                <div className="breadcrumbs-area mb-70">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumbs-menu">
                                    <ul>
                                        <li><a href="#">HOME</a></li>
                                        <li><a href="#" className="active">WISHLIST</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="entry-header-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="entry-header-title">
                                    <h2>Wishlist</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cart-main-area mb-70">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="wishlist-content">
                                    <form action="#">
                                        <div className="wishlist-table table-responsive">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th className="product-remove">
                                                            <span className="nobr">Remove</span>
                                                        </th>
                                                        <th className="product-thumbnail">Image</th>
                                                        <th className="product-name">Product Name</th>
                                                        <th className="product-price">Unit Price </th>
                                                        <th className="product-stock-stauts">Stock Status </th>
                                                        <th className="product-subtotal">Add To Cart </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        wishlist ? wishlist.map((e, i) => {
                                                            return <tr key={i}>
                                                                <td className="product-remove"><a onClick={ this.removeWishLish.bind(this,e)}>×</a></td>
                                                                <td className="product-thumbnail"><Link to={"product/" + e.product.productID}><img src={"images/"+e.product.productImage} alt="man" /></Link></td>
                                                                <td className="product-name"><Link to={"product/" + e.product.productID}>{e.product.productName}</Link></td>
                                                                <td className="product-price"><span className="amount">{e.product.price}</span></td>
                                                                <td className="product-stock-status"><span className="wishlist-in-stock">{
                                                                    e.product.quantity > 0 ? 'Stocking' : 'Out of stock' 
                                                                }</span></td>
                                                                <td className="product-add-to-cart"><a onClick={this.addToCart.bind(this,e)}> Add to Cart</a></td>
                                                            </tr>

                                                        }):null

                                                    }
                                             
                                                </tbody>
                                            </table>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
