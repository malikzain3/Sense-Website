import React from 'react';
import './Modal.css';


const EventModal = ({
  isEditing,
  closeForm,
  handleSubmit,
  formData,
  setFormData,
  handleImageUpload
}) => {
  return (
    <div className="modal-overlay">
      <div className="dashboard-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeForm}>✕</button>
        <h2 className="modal-title">{isEditing ? "Edit" : "Add"} <span>Event</span></h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="2" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #edf2f7' }} required />
          </div>
          <div className="form-row">
            <div className="input-box">
              <label>Date</label>
              <input placeholder="20" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
            </div>
            <div className="input-box">
              <label>Month</label>
              <input placeholder="Dec" value={formData.month} onChange={(e) => setFormData({ ...formData, month: e.target.value })} required />
            </div>
            <div className="input-box">
              <label>Year</label>
              <input placeholder="2026" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} />
            </div>
            <div className="input-box">
              <label>Status</label>
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="status-select">
                <option value="upcoming">Upcoming</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="input-box">
              <label>Time</label>
              <input placeholder="11:00 AM" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} required />
            </div>
            <div className="input-box">
              <label>Venue</label>
              <input placeholder="Hall 1" value={formData.venue} onChange={(e) => setFormData({ ...formData, venue: e.target.value })} required />
            </div>
          </div>
          <div className="form-row">
            <div className="input-box">
              <label>Registration Link</label>
              <input 
                placeholder="https://forms.gle/..." 
                value={formData.register_link || ''} 
                onChange={(e) => setFormData({ ...formData, register_link: e.target.value })} 
                disabled={formData.status === 'done'}
              />
            </div>
            <div className="input-box">
              <label>Drive Link</label>
              <input 
                placeholder="https://drive.google.com/..." 
                value={formData.drive_link || ''} 
                onChange={(e) => setFormData({ ...formData, drive_link: e.target.value })} 
                disabled={formData.status === 'upcoming'}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Event Image</label>
            <div className="professional-upload-area" onClick={() => document.getElementById("ev-file").click()}>
              {formData.image_url ? (
                <div className="upload-success-state">
                  <img src={formData.image_url} alt="preview" />
                  <p>Image uploaded successfully!</p>
                </div>
              ) : (
                <p style={{ margin: 0, fontWeight: 'bold', color: '#64748b' }}>Click to Upload Banner</p>
              )}
              <input type="file" id="ev-file" hidden accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>
          <button type="submit" className="submit-btn">ADD TO MEMORY</button>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
