import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    // this should be a functional component, does not have to class
    UNSAFE_componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('[OrderSummary] should update');
    }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(ingredientsKey => {
                return <li key={ingredientsKey + 1}>
                    <span style={{ textTransform: 'capitalize' }}>{ingredientsKey}</span> : <big>{this.props.ingredients[ingredientsKey]}</big>
                </li>
            });

        return (
            <Aux>
                <h2 style={{ fontWeight: '500' }}>Your Order</h2>
                <p>A delicious burger with the following ingredients.</p>
                <ul>{ingredientSummary}</ul>
                <p>Total Price: <big>{this.props.price.toFixed(2)}</big></p>
                <p>Continue to Checkout?</p>
                    <Button buttonType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                    <Button buttonType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;