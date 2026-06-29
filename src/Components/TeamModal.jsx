import React from 'react';
import './Modal.css';


const TeamModal = ({
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
        <h2 className="modal-title">{isEditing ? "Edit" : "Add"} <span>Member</span></h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Designation</label>
            <input value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required />
          </div>
          <div className="form-row">
            <div className="input-box">
              <label>Category</label>
              <select 
                value={formData.category || ""} 
                onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
                className="status-select"
                required
              >
                <option value="" disabled>Select Category</option>
                <option value="Cabinet">Cabinet</option>
                <option value="Team">Team Member</option>
              </select>
            </div>
            <div className="input-box">
              <label>Rank / Position</label>
              <select 
                value={formData.rank || ""} 
                onChange={(e) => setFormData({ ...formData, rank: e.target.value })} 
                className="status-select"
                disabled={formData.category !== 'Cabinet'}
                required
              >
                <option value="" disabled>Select Rank</option>
                <option value="1">Rank 1 (President)</option>
                <option value="2">Rank 2 (Vice President)</option>
                <option value="3">Rank 3 (Member)</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="professional-upload-area" onClick={() => document.getElementById("tm-file").click()}>
              {formData.image_url ? (
                <div className="upload-success-state">
                  <img src={formData.image_url} alt="preview" />
                  <p>Photo uploaded successfully!</p>
                </div>
              ) : (
                <p style={{ margin: 0, fontWeight: 'bold', color: '#64748b' }}>Click to Upload Photo</p>
              )}
              <input type="file" id="tm-file" hidden accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>
          <button type="submit" className="submit-btn">ADD TO MEMORY</button>
        </form>
      </div>
    </div>
  );
};

export default TeamModal;
