import React from "react";

import StripeCheckout from "react-stripe-checkout";

import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51HxlQwGTATKH0HUHNxTKSa7XetkyayEPg0WYITXXbE7Y6aLR0Gt5eiol5bX8BsUin5TTckj8fO1QNqY3r7YOHIa800FY9tr1R3'

  const onToken = token => {
    axios({
      url: '/payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    })
      .then(response => {
        alert('Succesful Payment!')
      })
      .catch(error => {
        console.log('Payment Error: ', error);
        alert(
          'There was an issue with your payment! Please make sure to use the provided credit card data'
        );
      });
  };

return(
  <StripeCheckout 
    label='Pay Now'
    name='CRWN Clothing Ltd'
    billingAddress
    shippingAddress
    image= 'https://sendeyo.com/up/d/f3eb2117da'
    description={`Your total is $${price}`}
    ammount={priceForStripe}
    panelLabel='Pay Now'
    token={onToken}
    stripeKey={publishableKey}
  />
);
};

export default StripeCheckoutButton;