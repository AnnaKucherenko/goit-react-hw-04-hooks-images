import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import ClipLoader from "react-spinners/FadeLoader";
import styles from './ImageGallery.module.css';

export default function ImagesGallery ({imagesSearch}){
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('idle');
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [query, setQuery] = useState('');
    
    const toggleModal=(image)=>{
        setShowModal(!showModal);
        setModalImage(image);
    };

    const updateRequest =()=>{
        if(query!==imagesSearch){
            setQuery(imagesSearch);
            setImages([]);
            setPage(1);
        }
    }

    updateRequest();

    
    useEffect(()=>{
        if(query===''){
            return
        }
        fetch(`https://pixabay.com/api/?q=${query}&page=${page}&key=25716572-e092d498007de7d313bf56634&image_type=photo&orientation=horizontal&per_page=12`)
            .then(response=>{
                if(response.ok){
                    return response.json();
                }
                return Promise.reject(new Error(`Немає зображень по запиту ${query}`))
            })
            .then(img =>{
                const imagesArr = img.hits;
                     
                if(page>1){
                    setImages(prevState=> [...prevState, ...imagesArr])
                }else{
                    setImages(imagesArr); 
                }
                setStatus('resolved');
                                     
            })
            .catch(error=>{
                setError(error); 
                setStatus('rejected');
            });
    }, [query,page])

       
        if(status==='idle'){
            return <div>Введіть запит</div>
        }
        if(status==='pending'){
            return <div>Завантажуєм...
                <ClipLoader  size={150} />
            </div>
        }
        if(status==='rejected'){
            return <h1>{error.message}</h1>
        }
        if(status==='resolved'){
            return (
                <div>
                    {showModal&&<Modal imageLarge={modalImage} onClose={toggleModal}/>}
                    <ul className={styles.imageGallery}>
                        {images.map(image=>(
                            
                            <ImageGalleryItem   onClick={()=>toggleModal(image.largeImageURL)} image={image} key={image.id}/>
                        )
                            
                        )}
                    </ul>
                    {images&&<Button onClick={()=>setPage(page+1)} />}
                </div>
            )
    }
}

ImagesGallery.propTypes = {
    imagesSearch: PropTypes.string.isRequired,
}