import React from 'react';
import './SeasonDisplay.css';

const seasonConfiguration = {
    summer: {
        text: 'Let\'s hit the beach',
        iconName: 'sun'
    },
    winter: {
        text: 'Burr it is cold!',
        iconName: 'snowlake'
    }
};

const getSeason = (latitude, month) => {
    if (month > 2 && month < 9) {
        return latitude > 0 ? 'summer' : 'winter';
    } else {
        return latitude > 0 ? 'winter' : 'summer';
    }
}

const SeasonDisplay = (props) => {
    const season = getSeason(props.latitude, new Date().getMonth());
    const { text, iconName } = seasonConfiguration[season];
    // const text = season === 'winter' ? 'Burr, it is chilly' : 'Lets hit the beach';
    // const icon = season === 'winter' ? 'snowfake' : 'sun';

    // return (
    //     <div>
    //         <i className={ `${icon} icon`}></i>
    //         <h1>{ text }</h1>
    //         <i className={ `${ icon } icon` }></i>
    //     </div>
    // )
    return (
        <div className={ `season-display ${season}`}>
            <i className={ `icon-left ${ iconName } icon` }></i>
            <h1>{ text }</h1>
            <i className={ `icon-right ${ iconName } icon` }></i>
        </div>
    )
};

export default SeasonDisplay;