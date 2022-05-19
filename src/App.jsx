import React, { Component } from 'react';
// import Modal from './components/Modal/Modal';
import Searchbar from 'components/searchbar/Saerchbar';
import ImageGallery from './components/imageGallery/ImageGallery';
// import Button from './components/Button/Button';


class App extends Component {
  state={
    images:'',
  }

  handleFormSubmit = images =>{
    this.setState({images})
    
  };

  render() {
    const {images}  = this.state;

    return (
      <div>
        {/* {showModal&&<Modal onClose={this.toggleModal}/>} */}
        <Searchbar onSubmit={this.handleFormSubmit}/>
        {images&&<ImageGallery imagesSearch={this.state.images}/>}
        {/* {images&&<Button />} */}
        
      </div>
    ); 

  
  }; 

  }

  

export default  App;
