import React from 'react'
import "./Gallery.css"
import galleryData from "../galleryData.js" // Data import kiya
import { useNavigate } from 'react-router-dom' // View more ke liye

const Gallery = () => {
  const navigate = useNavigate();

  //Only First 6 Pictures shown (Home page par)
  const displayImages = galleryData.slice(0, 6);

  return (
    <div id='Gallery'>
      <div className="Gallery-Heading">
        Gallery
      </div>
      
      <div className="Gallery-Images">
        {displayImages.map((item) => (
          <img 
            key={item.id} 
            src={item.img} 
            className="img" 
            alt="Gallery Post"
          />
        ))}
      </div>

      <div className="Gallery-Btn">
        <button onClick={() => navigate('/GalleryPage')}>VIEW MORE</button>
      </div>
    </div>
  )
}

export default Gallery