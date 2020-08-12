import React, { Component } from 'react';
import axios from '../../axios-orders';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-a3add.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                });
            })
            .catch(error => this.setState({ error: true }));
    }

    updatePurchaseState = (ingredients) => {
        const sumAllingredients = Object.keys(ingredients)
            .map(ingredientsKey => {
                return ingredients[ingredientsKey];
            })
            .reduce((sum, element) => {
                return sum + element;
            }, 0)

        this.setState({
            purchasable: sumAllingredients > 0
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.updatePurchaseState(updatedIngredients);
    }

    purchasaHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // this.props.history.push('/checkout');

        const queryParams = [];
        for (let i in this.state.ingredients) {
            //default  encodeURIComponent also remove any whitepace
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disableInformation = {
            ...this.state.ingredients
        }

        for (let key in disableInformation) {
            disableInformation[key] = disableInformation[key] <= 0;
        }
        // {salad: true, meat:false, ...} 
        // console.log(disableInformation)

        let orderSummary = null;
        let burger = this.state.error ? <big style={{ marginLeft: '35%' }}>Ingredients can't be loaded!</big> : <Spinner />;

        if (this.state.ingredients) {
            burger = <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={(type) => this.addIngredientHandler(type)}
                    ingredientRemoved={(type) => this.removeIngredientHandler(type)}
                    disabled={disableInformation}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchasaHandler}
                />
            </Aux>
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);