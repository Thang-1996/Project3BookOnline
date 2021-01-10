﻿const Adapter = {
    _token: "",
    base_url: window.location.origin + "/",
    getProducts: {
        url: "api/Products",
        params: {

        },
        method: "GET"
    },
    currentUserInfo: {
        url: "api/Payment/getUserInfo",
        params: {

        },
        method: "GET",
    },
    getOrders: {
        url: "api/Payment/GetOrders",
        params: {

        },
        method : "GET",
    },
    getOrderByUser: {
        url: "api/Payment/GetOrdersByUser",
        params: {
            
        },
        method : "GET",
    },
    saveOrder: {
        url: "api/saveOrder",
        params: {
            
        },
        method : "POST",
    },
    format_money: function (money) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
    },
};
export default Adapter;