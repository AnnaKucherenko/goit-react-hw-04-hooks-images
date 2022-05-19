import React, { Component } from 'react'; 
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import ClipLoader from "react-spinners/FadeLoader";
import styles from './ImageGallery.module.css';

export default class ImagesGallery extends Component{
    state ={
        images:[],
        error: null,
        status: 'idle',
        page: 1,
        showModal: false,
        modalImage: '',
    }

    toggleModal=(image)=>{
        this.setState(({showModal})=>({
            showModal:!showModal,
        }));
        this.setState({modalImage: image});
        
    };

    componentDidMount(){
            
            this.setState({status:'pending'});
            
            
            fetch(`https://pixabay.com/api/?q=${this.props.imagesSearch}&page=1&key=25716572-e092d498007de7d313bf56634&image_type=photo&orientation=horizontal&per_page=12`)
            .then(response=>{
                if(response.ok){
                    return response.json();
                }
                return Promise.reject(new Error(`Немає зображень по запиту ${this.props.imagesSearch}`))
            })
            .then(images =>{
                console.log(images);
                const imagesArr = images.hits;
                console.log(imagesArr );
                this.setState({images:imagesArr, status:'resolved'})})
            .catch(error=>this.setState({error, status:'rejected'}));
            
        
    }
   
    componentDidUpdate(prevProps, prevState){
        
        if(prevProps.imagesSearch!==this.props.imagesSearch){
            console.log('змінився запит');
            this.setState({status:'pending', page: 1});
            fetch(`https://pixabay.com/api/?q=${this.props.imagesSearch}&page=1&key=25716572-e092d498007de7d313bf56634&image_type=photo&orientation=horizontal&per_page=12`)
            .then(response=>{
                if(response.ok){
                    return response.json();
                }
                return Promise.reject(new Error(`Немає зображень по запиту ${this.props.imagesSearch}`))
            })
            .then(images =>{
                console.log(images);
                const imagesArr = images.hits;
                console.log(imagesArr );
                this.setState({images:imagesArr, status:'resolved'})})
            .catch(error=>this.setState({error, status:'rejected'}));
            
        }
    }

    handlButtonClick = ()=>{
            
            this.setState(prevState=>{
                console.log(prevState);
                return {page: prevState.page + 1};
            
            }, this.fetchImages);
                       
    }

    fetchImages =()=>{
        const page = this.state.page;
            fetch(`https://pixabay.com/api/?q=${this.props.imagesSearch}&page=${page}&key=25716572-e092d498007de7d313bf56634&image_type=photo&orientation=horizontal&per_page=12`)
            .then(response=>{
                if(response.ok){
                    return response.json();
                }
                return Promise.reject(new Error(`Немає зображень по запиту ${this.props.imagesSearch}`))
            })
            .then(images =>{
                const imagesArrNext = images.hits;
                this.setState(prevState=>({images:[...prevState.images, ...imagesArrNext], status:'resolved'}))})
            .catch(error=>this.setState({error, status:'rejected'}));
    }

    render(){
        const {images, error, status, showModal, modalImage}= this.state;
        
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
                    {showModal&&<Modal imageLarge={modalImage} onClose={this.toggleModal}/>}
                    <ul className={styles.imageGallery}>
                        {images.map(image=>(
                            
                            <ImageGalleryItem   onClick={()=>this.toggleModal(image.largeImageURL)} image={image} key={image.id}/>
                        )
                            
                        )}
                    </ul>
                    {images&&<Button onClick={this.handlButtonClick} />}
                </div>
            )
        }

        
    }
}