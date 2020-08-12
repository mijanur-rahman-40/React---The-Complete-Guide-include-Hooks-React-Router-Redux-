import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions';
import './Counter.css'

class Counter extends Component {
    render() {
        return (
            <div>
                <CounterOutput value={this.props.counter} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 10" clicked={this.props.onAddCounter} />
                <CounterControl label="Subtract 15" clicked={this.props.onSubtractCounter} />
                <br/>
                <button onClick={() => this.props.onStoreResult(this.props.counter)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(stringResult => (
                        <li key={stringResult.id} onClick={() => this.props.onDeleteResult(stringResult.id)}>{stringResult.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        counter: state.counter.counter,
        storedResults: state.result.results
    }
};

// all actions implemented
// action dispatching basically passing action type and payload
const mapDispatchToProps = (dispatch) => {
    return {
        onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
        onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
        onAddCounter: () => dispatch({ type: actionTypes.ADD, value: 10 }),
        onSubtractCounter: () => dispatch({ type: actionTypes.SUBTRACT, value: 15 }),
        onStoreResult: (result) => dispatch({ type: actionTypes.STORE_RESULT, result: result }),
        onDeleteResult: (id) => dispatch({ type: actionTypes.DELETE_RESULT, resultElId: id })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);