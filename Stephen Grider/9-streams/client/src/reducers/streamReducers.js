import _ from 'lodash';
import {
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types';

/**
 * Array based approach
 */

// const reducer = (state = [], action) => {
//     switch (action.type) {
//         case EDIT_STREAM:
//             return state.map(stream => {
//                 if (stream.id === action.type.id) {
//                     return action.payload;
//                 } else {
//                     return stream;
//                 }
//             });
//         default:
//             return state;
//      }
//  }

/**
 * Object based approach
 */

// const reducer = (state = {}, action) => {
//     switch (action.type) {
//         case EDIT_STREAM:
//             const newState = { ...state };
//             newState[action.payload.id] = action.payload;
//             return newState;
//         // another choice to do the same thing
//         // return { ...state, [action.payload.id]: action.payload }
//         default:
//             return state;
//     }
// };

export default (state = {}, action) => {
    switch (action.type) {
        /**
         * the function works like :
         * const colors = {id:3,id:5:id:7}
         * _.mapKeys(colors,'id')
         * output : {"3":{"id": 3},"5":{"id":5},"7":{"id":7}}
         */
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id') }
        case FETCH_STREAM:
            // with the string or key interpolation each object create a unique key
            // like [action.payload.id]
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case CREATE_STREAM:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case EDIT_STREAM:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}