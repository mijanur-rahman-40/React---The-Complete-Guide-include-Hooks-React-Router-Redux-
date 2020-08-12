import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            {/* fixing number into 2 */}
            <p>Current Price : <big>{props.price.toFixed(2)}</big></p>
            {
                controls.map(control => (
                    <BuildControl
                        key={control.label}
                        label={control.label}
                        added={() => props.ingredientAdded(control.type)}
                        removed={() => props.ingredientRemoved(control.type)}
                        disabled={props.disabled[control.type]}
                    />
                ))
            }
            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}
            >ORDER NOW</button>
        </div>
    );
};

export default buildControls;