import React, { useState, useEffect } from 'react';
import eventsData from '../eventsData.js';
import galleryData from '../galleryData.js'; // Gallery data import
import './Dashboard.css';

const Dashboard = () => {
    // --- States ---
    const [events, setEvents] = useState(eventsData);
    const [gallery, setGallery] = useState(galleryData);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [formData, setFormData] = useState({
        title: '', desc: '', date: '', month: '', time: '', venue: '', image: '', status: 'Upcoming'
    });

    // --- Background Scroll Lock ---
    useEffect(() => {
        if (showForm) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [showForm]);

    // --- Events Logic ---
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData({ ...formData, image: imageUrl });
        }
    };

    const closeForm = () => {
        setShowForm(false);
        setIsEditing(false);
        setCurrentId(null);
        setFormData({ title: '', desc: '', date: '', month: '', time: '', venue: '', image: '', status: 'Upcoming' });
    };

    const handleEdit = (ev) => {
        setFormData({ ...ev });
        setCurrentId(ev.id);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            setEvents(events.map(ev => (ev.id === currentId ? { ...formData, id: currentId } : ev)));
        } else {
            const newEvent = { ...formData, id: Date.now() }; 
            setEvents([newEvent, ...events]);
        }
        closeForm();
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete kar dein?")) {
            setEvents(events.filter(ev => ev.id !== id));
        }
    };

    // --- Gallery Logic ---
   const handleGalleryUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        const newImg = {
            id: Date.now(),
            img: URL.createObjectURL(file)
        };
        setGallery([newImg, ...gallery]);
    }
};
const changeGalleryImg = (e, id) => {
    const file = e.target.files[0];
    if (file) {
        const newUrl = URL.createObjectURL(file);
        setGallery(gallery.map(item => 
            item.id === id ? { ...item, img: newUrl } : item
        ));
    }
};

   const deleteGalleryImg = (id) => {
    if (window.confirm("Gallery image delete kar dein?")) {
        setGallery(gallery.filter(img => img.id !== id));
    }
};

    return (
        <div className="dashboard-wrapper">
            
            {/* --- SECTION 1: EVENTS --- */}
            <div className="dashboard-section">
                <div className="dashboard-header">
                    <h1>Manage <span>Events</span></h1>
                    <button className="add-main-btn" onClick={() => setShowForm(true)}>+ Add New Event</button>
                </div>

                <div className="dashboard-grid">
                    {events.map((ev) => (
                        <div key={ev.id} className="dash-event-card">
                            <div className="card-img-container">
                                <img src={ev.image || 'https://via.placeholder.com/300x180'} alt="" />
                                <span className={`status-badge ${ev.status?.toLowerCase()}`}>{ev.status}</span>
                            </div>
                            <div className="dash-card-content">
                                <h3>{ev.title}</h3>
                                <p className="card-desc">{ev.desc || "No description provided."}</p>
                                <p className="card-meta">📅 {ev.date} {ev.month} | ⏰ {ev.time}</p>
                                <div className="dash-actions">
                                    <button className="edit-btn" onClick={() => handleEdit(ev)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(ev.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="section-divider" />

            {/* --- SECTION 2: GALLERY --- */}
            <div className="dashboard-section gallery-dash-section">
                <div className="dashboard-header">
                    <h1>Manage <span>Gallery</span></h1>
                    <label className="add-main-btn">
                        + Upload Photo
                        <input type="file" accept="image/*" hidden onChange={handleGalleryUpload} />
                    </label>
                </div>

                <div className="gallery-dash-grid">
    {gallery.map((item) => (
        <div key={item.id} className="gallery-item-card">
            <img src={item.img} alt="Gallery" />
            
            <div className="gallery-controls-overlay">
                {/* Change Button */}
                <label className="control-btn edit-icon">
                    🔄
                    <input 
                        type="file" 
                        accept="image/*" 
                        hidden 
                        onChange={(e) => changeGalleryImg(e, item.id)} 
                    />
                </label>

                {/* Delete Button */}
                <button 
                    className="control-btn delete-icon" 
                    onClick={() => deleteGalleryImg(item.id)}
                >
                    🗑️
                </button>
            </div>
        </div>
    ))}
</div>
            </div>

            {/* --- FORM MODAL (Same as before) --- */}
            {showForm && (
                <div className="modal-overlay">
                    <div className="dashboard-card">
                        <button className="close-btn" onClick={closeForm}>✕</button>
                        <h2 className="modal-title">{isEditing ? 'Edit' : 'Add'} <span>Event</span></h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Event Title</label>
                                <input name="title" value={formData.title} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Short Description</label>
                                <textarea name="desc" value={formData.desc} onChange={handleChange} rows="2" className="status-select" style={{fontFamily: 'inherit'}} />
                            </div>
                            <div className="form-row">
                                <div className="input-box">
                                    <label>Date</label>
                                    <input name="date" value={formData.date} onChange={handleChange} required />
                                </div>
                                <div className="input-box">
                                    <label>Month</label>
                                    <input name="month" value={formData.month} onChange={handleChange} required />
                                </div>
                                <div className="input-box">
                                    <label>Status</label>
                                    <select name="status" value={formData.status} onChange={handleChange} className="status-select">
                                        <option value="Upcoming">Upcoming</option>
                                        <option value="Done">Done</option>
                                        <option value="Cancel">Cancel</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Venue & Time</label>
                                <div className="form-row">
                                    <input name="venue" value={formData.venue} onChange={handleChange} placeholder="Venue" />
                                    <input name="time" value={formData.time} onChange={handleChange} placeholder="Time" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Upload Banner Image</label>
                                <div className="file-upload-box">
                                    <input type="file" accept="image/*" onChange={handleImageUpload} id="event-img" hidden />
                                    <label htmlFor="event-img" className="upload-label">
                                        {formData.image ? "Image Selected ✅" : "Choose Image File"}
                                    </label>
                                    {formData.image && <img src={formData.image} alt="preview" className="upload-preview" />}
                                </div>
                            </div>
                            <button type="submit" className="submit-btn">{isEditing ? 'SAVE CHANGES' : 'PUBLISH EVENT'}</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;