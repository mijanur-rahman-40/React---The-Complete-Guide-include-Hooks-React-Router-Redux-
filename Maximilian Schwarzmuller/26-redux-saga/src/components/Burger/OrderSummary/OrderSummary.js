import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingredientsKey => {
            return <li key={ingredientsKey + 1}>
                <span style={{ textTransform: 'capitalize' }}>{ingredientsKey}</span> : <big>{props.ingredients[ingredientsKey]}</big>
            </li>
        });

    return (
        <Aux>
            <h2 style={{ fontWeight: '500' }}>Your Order</h2>
            <p>A delicious burger with the following ingredients.</p>
            <ul>{ingredientSummary}</ul>
            <p>Total Price: <big>{props.price.toFixed(2)}</big></p>
            <p>Continue to Checkout?</p>
            <Button buttonType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button buttonType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
}

export default OrderSummary;