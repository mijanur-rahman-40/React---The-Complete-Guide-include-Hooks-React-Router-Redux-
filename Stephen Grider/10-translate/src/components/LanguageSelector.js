import React from 'react';
import LanguageContext from '../contexts/LanguageContext';

class LanguageSelector extends React.Component{
    static contextType = LanguageContext;
    render() {
        // console.log(this.context);
        return (
            <div>
                Select a language :
                <br />
                {/* <i className='flag us'
                    onClick={ () => this.props.onLanguageChangle('english') }
                />
                <i className='flag nl'
                    onClick={ () => this.props.onLanguageChangle('dutch') }
                /> */}

                <i className='flag us'
                    onClick={ () => this.context.onLanguageChange('english') }
                />
                <i className='flag nl'
                    onClick={ () => this.context.onLanguageChange('dutch') }
                />
            </div>
       ) 
    }
}

export default LanguageSelector;