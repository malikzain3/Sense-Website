import React , { useRef, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Gallery.css"
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import img from "../assets/Pic.jpg"

const images = [
  img, img, img, img, img, img
];

const Gallery = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  // --- Scroll-based parallax ---
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const scrollX = useTransform(scrollYProgress, [0, 1], [0, -600]);

  // --- Drag-based scroll ---
  const dragX = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragStartValue, setDragStartValue] = useState(0);

  // Momentum refs
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const rafRef = useRef(null);

  // Triple the images for seamless infinite loop
  const loopedImages = [...images, ...images, ...images];

  // Width of one full set of images (calculated once after mount)
  const singleSetWidthRef = useRef(0);

  useEffect(() => {
    if (trackRef.current) {
      singleSetWidthRef.current = trackRef.current.scrollWidth / 3;
    }
  }, []);

  // Wrap dragX so it always stays within one set range (infinite loop)
  const wrapDragX = useCallback((value) => {
    const singleSetWidth = singleSetWidthRef.current;
    if (singleSetWidth === 0) return value;

    // Modulo wrap: keeps value cycling within [-singleSetWidth, 0]
    let wrapped = value % singleSetWidth;
    // Ensure it's always negative or zero for leftward consistency
    if (wrapped > 0) wrapped -= singleSetWidth;
    return wrapped;
  }, []);

  // Combine scrollY parallax + wrapped drag offset
  const combinedX = useTransform(
    [scrollX, dragX],
    ([scrollVal, dragVal]) => scrollVal + dragVal
  );

  // --- Mouse Events ---
  const handleMouseDown = (e) => {
    cancelAnimationFrame(rafRef.current);
    setIsDragging(true);
    setStartX(e.pageX);
    setDragStartValue(dragX.get());
    lastXRef.current = e.pageX;
    velocityRef.current = 0;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const currentX = e.pageX;
    const walk = (currentX - startX) * 1.2;
    dragX.set(wrapDragX(dragStartValue + walk));

    velocityRef.current = currentX - lastXRef.current;
    lastXRef.current = currentX;
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Momentum with wrapping
    const decelerate = () => {
      velocityRef.current *= 0.95;
      if (Math.abs(velocityRef.current) > 0.5) {
        dragX.set(wrapDragX(dragX.get() + velocityRef.current));
        rafRef.current = requestAnimationFrame(decelerate);
      }
    };
    decelerate();
  };

  // --- Touch Events (mobile) ---
  const handleTouchStart = (e) => {
    cancelAnimationFrame(rafRef.current);
    setIsDragging(true);
    setStartX(e.touches[0].pageX);
    setDragStartValue(dragX.get());
    lastXRef.current = e.touches[0].pageX;
    velocityRef.current = 0;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].pageX;
    const walk = (currentX - startX) * 1.2;
    dragX.set(wrapDragX(dragStartValue + walk));

    velocityRef.current = currentX - lastXRef.current;
    lastXRef.current = currentX;
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const decelerate = () => {
      velocityRef.current *= 0.95;
      if (Math.abs(velocityRef.current) > 0.5) {
        dragX.set(wrapDragX(dragX.get() + velocityRef.current));
        rafRef.current = requestAnimationFrame(decelerate);
      }
    };
    decelerate();
  };

  // Cleanup
  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div id='Gallery'>
      <div className="Gallery-Heading">
        Gallery
      </div>

      <div
        ref={sectionRef}
        className="Gallery-Container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          ref={trackRef}
          className="Gallery-Track"
          style={{
            x: combinedX,
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {loopedImages.map((src, index) => (
            <motion.div
              key={index}
              className="Gallery-Card"
            >
              <img
                src={src}
                alt={`img-${index}`}
                draggable={false}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="Gallery-Btn">
        <button onClick={() => { navigate('/GalleryPage'); }}>VIEW MORE</button>
      </div>
    </div>
  )
}

export default Gallery