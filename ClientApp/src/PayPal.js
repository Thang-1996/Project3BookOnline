
import React, { Component } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import notification from './notification';

export default class PayPal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
                
                };
    }
    render() {
        const cart = this.props.cart;
        var total = 0;
        var totalVND = 0;
        var items = [];
        cart.forEach(item => {
            items.push(({ name: item.product.productName, unit_amount: { currency_code: "USD", value: Math.round(item.product.price / 23000) }, quantity: item.quantity }));
            
            total += item.quantity * Math.round(item.product.price / 23000);
            totalVND += item.quantity * item.product.price;
         
        })
        if (totalVND < 500000) {
            total = total + Math.round(30000/23000);
            items.push(({ name: "Shipping Fee", unit_amount: { currency_code: "USD", value: Math.round(30000 / 23000)}, quantity: "1" }))
        }
        return (     
      
      <PayPalButton
                createOrder={(data, actions) => {
         
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                currency_code: "USD",
                                value: total,
                                breakdown: {
                                    item_total: {
                                        currency_code: "USD",
                                        value: total,
                                    }
                                }
                            },
                            items: items
                        }]
                    });
                }}
                onApprove={(data, actions) => {
                    
                    this.props.getOrderDetailPayPal("success");
                    return actions.order.capture().then(function (details) {
                        notification("success","Thanh toán paypal thành công bấm xác nhận để xem thời gian nhận hàng");
          });
        }}
      />
    );
  }
}