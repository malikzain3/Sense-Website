import React, { useState, useEffect } from "react";
import "./GalleryPage.css";

const photos = [
  { id: 1, src: "https://picsum.photos/600/900?random=1", alt: "Event 1", title: "Semantic AI", description: "Understanding the impact of Semantic AI." },
  { id: 2, src: "https://picsum.photos/600/400?random=2", alt: "Event 2", title: "AI & Future", description: "Understanding the impact of Generative AI." },
  { id: 3, src: "https://picsum.photos/600/500?random=3", alt: "Event 3", title: "Database Deep Dive", description: "Mastering SQL and NoSQL for scalable applications." },
  { id: 4, src: "https://picsum.photos/600/800?random=4", alt: "Event 4", title: "Tech Symposium", description: "Annual gathering of tech enthusiasts." },
  { id: 5, src: "https://picsum.photos/600/450?random=5", alt: "Event 5", title: "Code Fest 2026", description: "A 48-hour competitive coding marathon." },
  { id: 6, src: "https://picsum.photos/600/700?random=6", alt: "Event 6", title: "Cyber Security Workshop", description: "Learn the basics of ethical hacking." },
  { id: 7, src: "https://picsum.photos/600/350?random=7", alt: "Event 7", title: "Cloud Computing", description: "Scaling your apps with AWS and Azure." },
  { id: 8, src: "https://picsum.photos/600/600?random=8", alt: "Event 8", title: "UI/UX Bootcamp", description: "Designing interfaces that users love." },
  { id: 9, src: "https://picsum.photos/600/500?random=9", alt: "Event 9", title: "Blockchain Basics", description: "Demystifying Web3 and smart contracts." },
  { id: 10, src: "https://picsum.photos/600/850?random=10", alt: "Event 10", title: "Data Science 101", description: "Introduction to Python for data analysis." },
  { id: 11, src: "https://picsum.photos/600/400?random=11", alt: "Event 11", title: "Agile Methodologies", description: "Streamlining your development workflow." },
  { id: 12, src: "https://picsum.photos/600/750?random=12", alt: "Event 12", title: "Robotics Seminar", description: "Building the future of automation." },
  { id: 13, src: "https://picsum.photos/600/550?random=13", alt: "Event 13", title: "IoT Innovations", description: "Connecting the physical and digital worlds." },
  { id: 14, src: "https://picsum.photos/600/650?random=14", alt: "Event 14", title: "AR/VR Showcase", description: "Experiencing immersive realities." },
  { id: 15, src: "https://picsum.photos/600/480?random=15", alt: "Event 15", title: "Startup Pitch Deck", description: "Presenting your ideas to investors." },
  { id: 16, src: "https://picsum.photos/600/900?random=16", alt: "Event 16", title: "Open Source Summit", description: "Contributing to community projects." },
  { id: 17, src: "https://picsum.photos/600/900?random=17", alt: "Event 17", title: "Machine Learning Workshop", description: "Building intelligent systems with Python." },
  { id: 18, src: "https://picsum.photos/600/900?random=18", alt: "Event 18", title: "Web Development Bootcamp", description: "Mastering modern web development techniques." },
  { id: 19, src: "https://picsum.photos/600/900?random=19", alt: "Event 19", title: "Mobile App Development", description: "Creating cross-platform mobile applications." },
];

const COLUMNS = 4;

const distributePhotos = (photos, cols) => {
  const columns = Array.from({ length: cols }, () => []);
  photos.forEach((photo, i) => {
    columns[i % cols].push(photo);
  });
  return columns;
};

const GalleryPage = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [mounted, setMounted] = useState(false);
  const columns = distributePhotos(photos, COLUMNS);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`gallery-page ${mounted ? "page-entered" : "page-entering"}`}>

      <div className="heading-container">
        <h1 className="page-title">
          OUR <span className="title-highlight">GALLERY</span>
        </h1>
      </div>

      <div className="masonry-grid">
        {columns.map((column, colIndex) => (
          <div
            className="masonry-column"
            key={colIndex}
            style={{ "--col-i": colIndex }}
          >
            {column.map((photo, rowIndex) => (
              <div
                className="masonry-item"
                key={photo.id}
                style={{ "--item-i": colIndex * column.length + rowIndex }}
                onMouseEnter={() => setHoveredId(photo.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" />

                <div className={`masonry-overlay ${hoveredId === photo.id ? "visible" : ""}`}>
                  <div className="overlay-content">
                    <h3 className="event-title">{photo.title}</h3>
                    <p className="event-description">{photo.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;