import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Footer from './Footer';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;
    constructor(props) {
        super(props);
        this.state = {
            cart: props.cart,
        };
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
   
    render() {
        const { cart } = this.state;
    
    return (
        <div>
            <NavMenu cart={cart} />
            
                {this.props.children}
            
            <Footer />
      </div>
    );
  }
}
