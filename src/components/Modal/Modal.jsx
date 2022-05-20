import { useEffect } from 'react'; 
import {createPortal}from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({imageLarge, onClose}) {
    useEffect(()=>{
        window.addEventListener('keydown', handleKeyDown);
        return ()=>{
            console.log('функція розмонтування');
            window.removeEventListener('keydown', handleKeyDown);
        }
    },[]);

    const handleKeyDown = e => {
        if(e.code === 'Escape'){
            onClose();
        }
    }

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