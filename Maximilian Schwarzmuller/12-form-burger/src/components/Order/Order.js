import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ingredient => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '2px 8px',
                border: '1px solid whitesmoke',
                padding: '5px',
                borderRadius:'3px'
            }}
            key={ingredient.name}>{ingredient.name} ({ingredient.amount})</span>;
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <big>USD {Number.parseFloat(props.price).toFixed(2)}</big></p>
        </div>
    );
};

export default order;