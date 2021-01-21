import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Adapter from './Adapter';
import API from './API';
import Footer from './Footer';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;
    constructor(props) {
        super(props);
        this.state = {
            cart: props.cart,
            currentUser: props.currentUser
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.cart !== prevState.cart) {
            return {
                cart: nextProps.cart,
                currentUser: nextProps.currentUser,
          
           
            };
        }
        return null;
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
   
    render() {
        const { cart, currentUser } = this.state;
    
    return (
        <div>
            <NavMenu currentUser={currentUser} cart={cart} />
            
                {this.props.children}
            
            <Footer />
      </div>
    );
  }
}
