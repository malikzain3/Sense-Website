import React from 'react'
import "./Gallery.css"
import img from "../assets/Pic.jpg"

const Gallery = () => {
  return (
    <div id='Gallery'>
      <div className="Gallery-Heading">
        Gallery
      </div>
      <div className="Gallery-Images">
        <img src={img} className="img img1"/>
        <img src={img} className="img img1"/>
        <img src={img} className="img img1"/>
        <img src={img} className="img img1"/>
        <img src={img} className="img img1"/>
        <img src={img} className="img img1"/>
      </div>
      <div className="Gallery-Btn">
        <button>VIEW MORE</button>
      </div>
    </div>
  )
}

export default Gallery
