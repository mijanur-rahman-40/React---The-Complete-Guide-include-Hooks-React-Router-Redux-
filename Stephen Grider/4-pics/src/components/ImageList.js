import React from 'react';

import ImageCard from './ImageCard';
import './ImageList.css';

const ImageList = (props) => {
    // console.log(props.images);
    // const images = props.images.map((image) => {
    //     return (
    //         <div key={ image.id }>
    //             <img  src={ image.urls.regular } alt={ image.alt_description } />
    //         </div>
    //     )
    // });
    // const images = props.images.map(({ id, urls, alt_description }) => {
    //     return (
    //         <div key={ id }>
    //             <img src={ urls.regular } alt={ alt_description } />
    //         </div>
    //     )
    // });

    const images = props.images.map((image) => {
        return <ImageCard key={ image.id } image={ image }/>
    });
    return (
        <div className='image-list'>{ images } </div>
    )
};
export default ImageList;