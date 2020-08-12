export default (state=[],action) => {
    // reducer must return any object or string or   not any undefined

    // string,number,array,object are immutable into reducer. have to use good approach
    // mutate means change in array or object by the elements
    // reducer state is basically object or array
    // return [];

    // if (action.type === 'FETCH_POSTS') {
    //     return action.payload;
    // }

    // return state;

    // the good aproach is to use switch statements instead of if 
    switch (action.type) {
        case 'FETCH_POSTS':
            return action.payload;
        default:
            return state;
    }
}