import { useState } from 'react';

import Searchbar from 'components/searchbar/Saerchbar';
import ImageGallery from './components/imageGallery/ImageGallery';

export default function App () {
  const [images, setImages] = useState('');

  const handleFormSubmit = img =>{
    setImages(img);
  };

  return (
      <div>
        <Searchbar onSubmit={handleFormSubmit}/>
        {images&&<ImageGallery imagesSearch={images}/>}
             
      </div>
  ); 
}

  
