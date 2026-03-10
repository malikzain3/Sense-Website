import React, { useEffect } from 'react'
import galleryData from "../galleryData.js"
import "./GalleryPage.css"

const GalleryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id='Gallery1' style={{paddingTop: '120px', minHeight: '100vh'}}>
      <div className="Gallery-Heading">
        Our Full <span>Gallery</span>
      </div>
      
      <div className="Gallery-Images">
        {galleryData.map((item) => (
          <img 
            key={item.id} 
            src={item.img} 
            className="img" 
            alt="Gallery Full"
          />
        ))}
      </div>
    </div>
  )
}

export default GalleryPage