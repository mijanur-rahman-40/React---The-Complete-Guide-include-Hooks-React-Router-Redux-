import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const Burger = (props) => {
    // getting the all keys of props object
    let transformedIngredients = Object.keys(props.ingredients)
        .map((ingredientsKey) => {
            // constructing a new array every time
            // console.log(...Array(props.ingredients[ingredientsKey]));
            return [...Array(props.ingredients[ingredientsKey])]
                .map((_, i) => {
                    // console.log(ingredientsKey + i)
                    return <BurgerIngredient key={ingredientsKey + i} type={ingredientsKey} />
                })
        })
        // checking for any empty ingredients
        // arr -> previous array
        // element-> current value
        // [] -> intial value is the reduced value of reduce function
        .reduce((arr, element) => {
            // console.log(element)
            return arr.concat(element)
        }, []);
    // console.log(transformedIngredients);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default Burger;