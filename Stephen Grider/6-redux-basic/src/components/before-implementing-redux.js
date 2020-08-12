import React from 'react';
import { createStore, combineReducers } from 'redux';

const SimpleRedux = () => {
    // people dropping off (a form) action creator
    const createPolicy = (name, amount) => {
        return {
            type: 'CREATE_POLICY',
            payload: {
                name: name,
                amount: amount
            }
        }
    }

    const deletePolicy = (name) => {
        return {
            type: 'DELETE_POLICY',
            payload: {
                name: name
            }
        }
    }

    const createClaim = (name, amountOfMoneyToCollect) => {
        return {
            type: 'CREATE_CLAIM',
            payload: {
                name: name,
                amountOfMoneyToCollect: amountOfMoneyToCollect
            }
        }
    }

    // Reducers (Department )
    // at first load oldListOfClaims always be empty
    const claimsHistory = (oldListOfClaims = [], action) => {
        if (action.type === 'CREATE_CLAIM') {
            // we care about this action (FORM)
            // oldListOfClaims.push(action.payload);
            return [...oldListOfClaims, action.payload];
        }
        // else -> we don't care the action (FORM)
        return oldListOfClaims;
    };

    const accounting = (bagOfMoney = 100, action) => {
        if (action.type === 'CREATE_CLAIM') {
            return bagOfMoney - action.payload.amountOfMoneyToCollect;
        } else if (action.type === 'CREATE_POLICY') {
            return bagOfMoney + action.payload.amount;
        }
        return bagOfMoney;
    };

    const policies = (listOfPolicies = [], action) => {
        if (action.type === 'CREATE_POLICY') {
            return [...listOfPolicies, action.payload.name];
        } else if (action.type === 'DELETE_POLICY') {
            return listOfPolicies.filter((name) => {
                return name !== action.payload.name;
            });
        }
        return listOfPolicies;
    }

    const ourDepartments = combineReducers({
        accounting: accounting,
        claimsHistory: claimsHistory,
        policies: policies
    });

    const store = createStore(ourDepartments);

    // const action = createPolicy('Alex', 20);
    // const action = deletePolicy('Madan');
    // const action = createClaim('Alex', 10);

    store.dispatch(createPolicy('Alex', 20));
    store.dispatch(createPolicy('Madan', 120));
    store.dispatch(createPolicy('Jerin', 100));

    store.dispatch(createClaim('Alex', 30));
    store.dispatch(createClaim('Jerin', 50));

    store.dispatch(deletePolicy('Alex'));

    // get the entire big store
    console.log(store.getState());
    return (
        <div>Redux basic</div>
    )
}
export default SimpleRedux;