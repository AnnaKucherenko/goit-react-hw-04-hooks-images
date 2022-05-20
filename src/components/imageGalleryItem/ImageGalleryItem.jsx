import React from 'react'; 
import PropTypes from "prop-types";
import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({onClick, image:{id, webformatURL, tags}}){
    return(
        <li key ={id} className={styles.imageGalleryItem}>
            
            <img  onClick={onClick}  src={webformatURL} alt={tags} className={styles.imageGalleryItem_image} />
        </li>
    )
}

ImageGalleryItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    image: PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
    }),
   
};