import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ViewProducts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: props.product,
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.products !== prevState.products) {
            return { products: nextProps.products };
        }
        return null;
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.products !== this.props.products) {
            //Perform some operation here
            this.setState({ products: this.props.products });
        }
    }
    setProduct = (e) => {
        this.props.setProduct(e);
    }
    render() {
        let products = this.state.products;
        console.log(products)

        return (
            <div className="modal fade bd-example-modal-lg view-products" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="container p-4">
                        <div className="modal-content p-4" >
                            <div className="col-md-12 row">
                                <div className="col-md-10">
                                    <h4>Những cuốn sách liên quan  </h4>
                                    <div className="container">
                                        <div className="row">
                                            {
                                                products ? products.map((e, index) => {
                                                    return (
                                                        <div className="col-sm" key={index}>
                                                            <img style={{ with: "300px" }} data-dismiss="modal" onClick={this.setProduct.bind(this, e.product)} src={"/images/" + e.product.productImage} />
                                                            <Link className="close mt-3" data-dismiss="modal" onClick={this.setProduct.bind(this, e.product)} style={{ color: "black", fontSize: "24px" }} to={"/product/" + e.product.productID} >{e.product.productName} </Link>
                                                    
                                                        </div>
                                                        )
                                                }) : null
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
