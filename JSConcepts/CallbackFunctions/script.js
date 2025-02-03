const cart = ["shoes", "mobile", "kurta"];

const api = ()=> {

}
//Callback function will bring async nature in JavaScript

//CallBack hell- nested callback, code become un-maintainable
api.createOrder(cart, 
    
    //We are passing function to api, Inversion of Control
    function(){

        api.proceedWithPayment(function(){

            api.showOrderSummary(
                function(){
                    api.updateWallet();
                }
            )
        })
    }
);


