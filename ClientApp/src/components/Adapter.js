const Adapter = {
    _token: "",
    base_url: window.location.origin + "/",
    getProducts: {
        url: "api/Products",
        params: {

        },
        method: "GET"
    },
    getCategories: {
        url: "api/Categories/GetCategories",
        params: {
            
        },
        method: "GET"
    },
    getCategoriesID: {
        url: "api/Categories/GetCategoriesbyID",
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
        url: "api/Payment/saveOrder",
        params: {
            
        },
        method : "POST",
    },
    format_money: function (money) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
    },
    getAuthor: {
        url: "api/author/detail",
        params: {

        },
        method: "GET"
    },
    saveChangeUser: {
        url: "api/Payment/saveChangeUser",
        params: {

        },
        method :"POST",
    },
    sendReview: {
        url: "api/Payment/sendReview",
        params: {

        },
        method : "POST",
    },
    sendAnswer: {
        url: "api/Payment/sendAnswer",
        params: {

        },
        method: "POST",
    },
     
    
    
};
export default Adapter;