import React, { useState, useEffect } from "react";
import "./GalleryPage.css";
import { supabase } from "../supabase";

const COLUMNS = 4;

const distributePhotos = (photos, cols) => {
  const columns = Array.from({ length: cols }, () => []);
  photos.forEach((photo, i) => { columns[i % cols].push(photo); });
  return columns;
};

const GalleryPage = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
      if (data) setPhotos(data);
    };
    fetchGallery();
  }, []);

  const columns = distributePhotos(photos, COLUMNS);

  return (
    <div className={`gallery-page ${mounted ? "page-entered" : "page-entering"}`}>
      <div className="heading-container">
        <h1 className="page-title">OUR <span className="title-highlight">GALLERY</span></h1>
      </div>
      {photos.length === 0 ? (
        <p style={{textAlign:'center', padding:'50px', color:'#666'}}>No photos yet. Upload from Dashboard!</p>
      ) : (
        <div className="masonry-grid">
          {columns.map((column, colIndex) => (
            <div className="masonry-column" key={colIndex} style={{ "--col-i": colIndex }}>
              {column.map((photo, rowIndex) => (
                <div
                  className="masonry-item"
                  key={photo.id}
                  style={{ "--item-i": colIndex * column.length + rowIndex }}
                  onMouseEnter={() => setHoveredId(photo.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <img src={photo.image_url} alt="gallery" loading="lazy" />
                  <div className={`masonry-overlay ${hoveredId === photo.id ? "visible" : ""}`}>
                    <div className="overlay-content">
                      <p className="event-description">{photo.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;