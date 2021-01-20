import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Adapter from '../../Adapter';

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: props.product,
        };
        this.tangGiamSL = this.tangGiamSL.bind(this);
        this.xoaProduct = this.xoaProduct.bind(this);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.product !== prevState.product) {
            return {
                product: nextProps.product,
              
            };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.product !== this.props.product ) {

            this.setState({
                product: this.props.product,
               
            });
        }
    }
    tangGiamSL(e) {
        let value = e.target.value;
        let product = this.state.product;
        if (value > 0) {
            if (product.product.quantity > value) {
                product.quantity = value;
            } else {
                alert("Hàng trong Kho không đủ")
            }
        }
        this.setState({
            product: product
        });
        let cart = localStorage.getItem("cart");
        if (cart === null) cart = [];
        else cart = JSON.parse(cart);
  
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].product.productID === product.product.productID) {
                cart[i].quantity = product.quantity;
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        this.props.updateCartState();
    }
    xoaProduct() {
      
        let product = this.state.product;
        let cart = localStorage.getItem("cart");
        let newCart = [];
        if (cart === null || cart.trim() === "") cart = [];
        else cart = JSON.parse(cart);
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].product.productID !== product.product.productID) {
                newCart.push(product);
            }
        }
        localStorage.setItem("cart", JSON.stringify(newCart));
        this.props.updateCartState();
    }
    render() {
        const { product } = this.state;
        return (
            <tr >
                <td className="product-thumbnail"><Link to={"/product/" + product.product.productID}><img src={"/images/" + product.product.productImage} alt="man" /></Link></td>
                <td className="product-name"><Link to={"/product/" + product.product.productID}>{product.product.productName}</Link></td>
                <td className="product-price"><span className="amount">{Adapter.format_money(product.product.price)}</span></td>
                <td className="product-quantity"><input onChange={this.tangGiamSL} type="number" defaultValue={product.quantity} /></td>
                <td className="product-subtotal">{Adapter.format_money(product.product.price * product.quantity)}</td>
                <td className="product-remove"><a style={{ cursor: "pointer"}} onClick={this.xoaProduct}><i className="fa fa-times" /></a></td>
            </tr>
        );
    }
}
