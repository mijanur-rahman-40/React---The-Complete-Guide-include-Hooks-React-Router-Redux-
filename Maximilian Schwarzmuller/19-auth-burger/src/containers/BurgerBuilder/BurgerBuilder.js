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
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sumOfAllIngredients = Object.keys(ingredients)
            .map(ingredientsKey => {
                return ingredients[ingredientsKey];
            })
            .reduce((sum, element) => {
                return sum + element;
            }, 0)
        return sumOfAllIngredients > 0
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true })
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disableInformation = {
            ...this.props.ingredients
        }

        for (let key in disableInformation) {
            disableInformation[key] = disableInformation[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <big style={{ marginLeft: '35%' }}>Ingredients can't be loaded!</big> : <Spinner />;

        if (this.props.ingredients) {
            burger = <Aux>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    ingredientAdded={(type) => this.props.onIngredientAdded(type)}
                    ingredientRemoved={(type) => this.props.onIngredientRemoved(type)}
                    disabled={disableInformation}
                    price={this.props.totalPrice}
                    purchasable={this.updatePurchaseState(this.props.ingredients)}
                    ordered={this.purchaseHandler}
                    isAuth={this.props.isAuthenticated}
                />
            </Aux>
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />;
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
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
    };
}
// dispatch-able props
const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));