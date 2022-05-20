import { useState } from 'react'; 
import { ImSearch } from 'react-icons/im';
import PropTypes from "prop-types";
import styles from './Searchbar.module.css';

export default function Searchbar ({onSubmit}) {
    const [images, setImages]= useState('');
    
    const handleSearch = evt => {
        setImages(evt.currentTarget.value.toLowerCase())
    };

    const handleSubmit = evt=>{
        evt.preventDefault();
        if(images.trim()===''){
            alert('Введите запрос');
            return;
        }
        onSubmit(images);
        setImages('');
    };

    return (
            <header className={styles.searchbar}>
                <form onSubmit={handleSubmit} className={styles.searchForm}>
                    <button type="submit" className={styles.searchForm_button}>
                        <ImSearch style={{ marginRight: 5, width: 35 }} />
                        <span className={styles.searchForm_buttonLabel }>Search</span>
                    </button>

                    <input
                    className={styles.searchForm_input}
                    type="text"
                    value={images}
                    placeholder="Search images and photos"
                    onChange={handleSearch}
                    />
                </form>
            </header>
    );
    
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}