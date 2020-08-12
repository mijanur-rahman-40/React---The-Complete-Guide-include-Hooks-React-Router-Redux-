import React from 'react';

class ImageCard extends React.Component {
    // to access individual dom element we have to create a react reference first.
    constructor(props) {
        super(props);
        this.state = {
            spans: 0
        }
        this.imageReference = React.createRef();
    }

    componentDidMount() {
        // console.log(this.imageReference);
        // console.log(this.imageReference.current.clientHeight);
        this.imageReference.current.addEventListener('load', this.setSpans);
    }

    setSpans = () => {
        // console.log(this.imageReference.current.clientHeight);
        const height = this.imageReference.current.clientHeight;
        const spans = Math.floor(height / 10);
        this.setState({
            spans: spans
        });
    }
    render() {
        const { alt_description, urls } = this.props.image;
        return (
            <div style={ { gridRowEnd: `span ${ this.state.spans }` } }>
                <img
                    ref={ this.imageReference }
                    alt={ alt_description }
                    src={ urls.regular }
                />
            </div>
        )
    }
}

export default ImageCard;