import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {

    }

    updatePurchaseState = (ingredients) => {
        const sumOfAllingredients = Object.keys(ingredients)
            .map(ingredientsKey => {
                return ingredients[ingredientsKey];
            })
            .reduce((sum, element) => {
                return sum + element;
            }, 0)
        return sumOfAllingredients > 0
    }

    purchasaHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disableInformation = {
            ...this.props.ingredients
        }

        for (let key in disableInformation) {
            disableInformation[key] = disableInformation[key] <= 0;
        }
        // {salad: true, meat:false, ...} 
        // console.log(disableInformation)

        let orderSummary = null;
        let burger = this.state.error ? <big style={{ marginLeft: '35%' }}>Ingredients can't be loaded!</big> : <Spinner />;

        if (this.props.ingredients) {
            burger = <Aux>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    ingredientAdded={(type) => this.props.onIngredientAdded(type)}
                    ingredientRemoved={(type) => this.props.onIngredientRemoved(type)}
                    disabled={disableInformation}
                    price={this.props.totalPrice}
                    purchasable={this.updatePurchaseState(this.props.ingredients)}
                    ordered={this.purchasaHandler}
                />
            </Aux>
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
}
// dispatchable props
const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) =>
            dispatch({
                type: actionTypes.ADD_INGREDIENT,
                ingredientName: ingredientName
            }),
        onIngredientRemoved: (ingredientName) =>
            dispatch({
                type: actionTypes.REMOVE_INGREDIENT,
                ingredientName: ingredientName
            })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));