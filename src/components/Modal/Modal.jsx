import { useEffect } from 'react'; 
import {createPortal}from 'react-dom';
import PropTypes from "prop-types";
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({imageLarge, onClose}) {
    useEffect(()=>{
        const handleKeyDown = e => {
                if(e.code === 'Escape'){
                    onClose();
                }
            }

        window.addEventListener('keydown', handleKeyDown);
        return ()=>{
            console.log('функція розмонтування');
            window.removeEventListener('keydown', handleKeyDown);
        }
    },[onClose]);

    

    const handleBackdropClick = evt =>{
        if(evt.currentTarget === evt.target){
            onClose();
        }
    }

    return createPortal(
            <div className={styles.overlay} onClick ={handleBackdropClick}>
                <div className={styles.modal}>
                    <img src={imageLarge} alt="" />
                </div>
            </div>, 
            modalRoot,
    );
    
}

Modal.propTypes = {
    imageLarge: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}