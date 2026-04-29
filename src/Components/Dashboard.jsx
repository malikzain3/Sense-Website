import React, { useState, useEffect } from "react";
import eventsData from "../eventsData.js";
import galleryData from "../galleryData.js";
import teamData from "../teamData.js";
import "./Dashboard.css";
import toast from "react-hot-toast"

const Dashboard = () => {

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
        toast.error("Pehle Login karo bhai!");
        window.location.href = '/LoginPage';
    }
}, []);
  // --- States ---
  const [events, setEvents] = useState(eventsData);
  const [gallery, setGallery] = useState(galleryData);
  const [team, setTeam] = useState(teamData);

  const [baselineEvents, setBaselineEvents] = useState(eventsData);
  const [baselineGallery, setBaselineGallery] = useState(galleryData);
  const [baselineTeam, setBaselineTeam] = useState(teamData);

  const [showForm, setShowForm] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    date: "",
    month: "",
    time: "",
    venue: "",
    image: "",
    status: "Upcoming",
    registerLink: "",
    driveLink: "",
  });
  const [teamFormData, setTeamFormData] = useState({
    name: "",
    designation: "",
    image: "",
    category: "Cabinet",
    rank: "3",
  });

 
useEffect(() => {
  if (showForm || showTeamForm) {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
  } else {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    if (scrollY) window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }
}, [showForm, showTeamForm]);

  // --- Events & Gallery Handlers ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file)
      setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uniqueId = Number(new Date());
    if (isEditing) {
      setEvents(
        events.map((ev) =>
          ev.id === currentId ? { ...formData, id: currentId } : ev,
        ),
      );
      toast.success("Event updated successfully! ✨");
    } else {
      setEvents([{ ...formData, id: uniqueId }, ...events]);
      toast.success("Event added successfully! 🚀");
    }
    closeForm();
  };

  const handleGalleryUpload = (e) => {
    const file = e.target.files[0];
    if (file)
      setGallery([
        { id: Number(new Date()), img: URL.createObjectURL(file) },
        ...gallery,
      ]);
      toast.success("Gallery item added successfully! �" );
  };

  // --- Team Handlers ---
  const handleTeamImage = (e) => {
    const file = e.target.files[0];
    if (file)
      setTeamFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
      toast.success("Photo uploaded successfully! 📸" );
  };

  const handleTeamSubmit = (e) => {
    e.preventDefault();
    const uniqueId = Number(new Date());
    if (isEditing) {
      setTeam(
        team.map((m) =>
          m.id === currentId ? { ...teamFormData, id: currentId } : m,
        ),
      );
      toast.success("Team member updated successfully! ✨");
    } else {
      setTeam([{ ...teamFormData, id: uniqueId }, ...team]);
      toast.success("Team member added successfully! 🚀");
    }
    closeTeamForm();
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setFormData({
      title: "",
      desc: "",
      date: "",
      month: "",
      time: "",
      venue: "",
      image: "",
      status: "Upcoming",
      registerLink: "",
      driveLink: "",
    });
  };
  const closeTeamForm = () => {
    setShowTeamForm(false);
    setIsEditing(false);
    setTeamFormData({
      name: "",
      designation: "",
      image: "",
      category: "Cabinet",
      rank: "3",
    });
  };

  const hasChanges = 
    JSON.stringify(events) !== JSON.stringify(baselineEvents) ||
    JSON.stringify(gallery) !== JSON.stringify(baselineGallery) ||
    JSON.stringify(team) !== JSON.stringify(baselineTeam);

  const handleGlobalSave = () => {
    setBaselineEvents(events);
    setBaselineGallery(gallery);
    setBaselineTeam(team);
    toast.success("All changes saved successfully! 🚀");
  };

  return (
    <div className="dashboard-wrapper">
      {/* --- GLOBAL SAVE BUTTON --- */}
      <div className="global-save-container">
        <button 
          className="global-save-btn" 
          disabled={!hasChanges} 
          onClick={handleGlobalSave}
        >
          <span className="save-icon">💾</span> {hasChanges ? "Save Changes" : "No Changes"}
        </button>
      </div>

      {/* 1. EVENTS SECTION */}
      <div className="dashboard-section">
        <div className="dashboard-header">
          <h1>Manage <span>Events</span></h1>
          <button className="add-main-btn" onClick={() => setShowForm(true)}>+ Add Event</button>
        </div>
        <div className="dashboard-grid">
          {events.map((ev) => (
            <div key={ev.id} className="dash-event-card">
              <div className="card-img-container">
                <img src={ev.image || "https://via.placeholder.com/300x180"} alt="" />
                <span className={`status-badge ${ev.status?.toLowerCase()}`}>{ev.status}</span>
              </div>
              
              <div className="dash-card-content">
                
                <div className="card-date-badge">{ev.date} {ev.month} {ev.year}</div>
                <h3>{ev.title}</h3>
                <p className="card-desc">{ev.desc}</p>
                <div className="card-meta">
                  <span>📍 {ev.venue}</span> | <span>⏰ {ev.time}</span>
                </div>
                
                <div className="dash-actions">
                  <button className="edit-btn" onClick={() => {
                      setFormData(ev);
                      setCurrentId(ev.id);
                      setIsEditing(true);
                      setShowForm(true);
                  }}>Edit</button>
                  <button className="delete-btn" onClick={() => setEvents(events.filter((x) => x.id !== ev.id))}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="section-divider" />

      {/* --- 2. GALLERY SECTION --- */}
      <div className="dashboard-section gallery-dash-section">
        <div className="dashboard-header">
          <h1>
            Manage <span>Gallery</span>
          </h1>
          <label className="add-main-btn">
            + Upload Photo
            
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleGalleryUpload}
            />
          </label>
        </div>

        <div className="gallery-dash-grid">
          {gallery.map((item) => (
            <div key={item.id} className="gallery-item-card">
              <img src={item.img} alt="Gallery" />

              <div className="gallery-controls-overlay">
                
                <label className="control-btn edit-icon">
                  🔄
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const newUrl = URL.createObjectURL(file);
                        setGallery(
                          gallery.map((g) =>
                            g.id === item.id ? { ...g, img: newUrl } : g,
                          ),
                        );
                      }
                    }}
                  />
                </label>

                <button
                  className="control-btn delete-icon"
                  onClick={() =>
                    setGallery(gallery.filter((g) => g.id !== item.id))
                  }
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="section-divider" />

      {/* 3. TEAM SECTION */}
      <div className="dashboard-section">
        <div className="dashboard-header">
          <h1>
            Manage <span>Team</span>
          </h1>
          <button
            className="add-main-btn"
            onClick={() => setShowTeamForm(true)}
          >
            + Add Member
          </button>
        </div>
        <div className="dashboard-grid">
          {[...team]
            .sort((a, b) => a.rank - b.rank)
            .map((m) => (
              <div key={m.id} className="dash-event-card">
                <div className="card-img-container">
                  <img
                    src={m.image || "https://via.placeholder.com/150"}
                    alt=""
                    style={{ height: "220px" }}
                  />
                  <span className={`status-badge ${m.category.toLowerCase()}`}>
                    {m.category}
                  </span>
                </div>
                <div
                  className="dash-card-content"
                  style={{ textAlign: "center" }}
                >
                  <h3
                    style={{
                      color:
                        m.rank === "1"
                          ? "#f59e0b"
                          : m.rank === "2"
                            ? "#1dbbc3"
                            : "#2d3436",
                    }}
                  >
                    {m.name}
                  </h3>
                  <p className="card-meta">{m.designation}</p>
                  <div className="dash-actions">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setTeamFormData(m);
                        setCurrentId(m.id);
                        setIsEditing(true);
                        setShowTeamForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => setTeam(team.filter((x) => x.id !== m.id))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* --- EVENT MODAL --- */}
      {showForm && (
        <div className="modal-overlay">
          <div className="dashboard-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeForm}>✕</button>
            <h2 className="modal-title">{isEditing ? "Edit" : "Add"} <span>Event</span></h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required minLength={'3'} />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea value={formData.desc} onChange={(e) => setFormData({ ...formData, desc: e.target.value })} rows="2" style={{width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #edf2f7'}} required minLength={'10'} />
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
                    <label>Status</label>
                    <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="status-select">
                        <option value="Upcoming">Upcoming</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
              </div>

              <div className="form-row">
                 <div className="input-box">
                    <label>Time</label>
                    <input placeholder="11:00 AM" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })}  required/>
                </div>
                <div className="input-box">
                    <label>Venue</label>
                    <input placeholder="Hall 1" value={formData.venue} onChange={(e) => setFormData({ ...formData, venue: e.target.value })} required />
                </div>
              </div>

              <div className="form-row">
                 <div className="input-box">
                    <label>Registration Link (Google Form)</label>
                    <input placeholder="https://forms.gle/..." value={formData.registerLink || ''} onChange={(e) => setFormData({ ...formData, registerLink: e.target.value })} />
                </div>
                <div className="input-box">
                    <label>Drive Link (Photos)</label>
                    <input placeholder="https://drive.google.com/..." value={formData.driveLink || ''} onChange={(e) => setFormData({ ...formData, driveLink: e.target.value })} />
                </div>
              </div>

              
              <div className="form-group">
                <label>Event Image</label>
                <div className="professional-upload-area" onClick={() => document.getElementById("ev-file").click()}>
                  {formData.image ? <div className="preview-container"><img src={formData.image} alt="preview" /></div> : <p>Click to Upload Banner</p>}
                  <input type="file" id="ev-file" hidden accept="image/*" onChange={handleImageUpload} required/>
                </div>
              </div>

              <button type="submit" className="submit-btn">SAVE EVENT</button>
            </form>
          </div>
        </div>
      )}
      

      {/* --- TEAM MODAL --- */}
      {showTeamForm && (
        <div className="modal-overlay">
          <div className="dashboard-card">
            <button className="close-btn" onClick={closeTeamForm}>
              ✕
            </button>
            <h2 className="modal-title">
              {isEditing ? "Edit" : "Add"} <span>Member</span>
            </h2>
            <form onSubmit={handleTeamSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  name="name"
                  value={teamFormData.name}
                  onChange={(e) =>
                    setTeamFormData({ ...teamFormData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Designation</label>
                <input
                  name="designation"
                  value={teamFormData.designation}
                  onChange={(e) =>
                    setTeamFormData({
                      ...teamFormData,
                      designation: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-row">
                <select
                  name="category"
                  value={teamFormData.category}
                  onChange={(e) =>
                    setTeamFormData({
                      ...teamFormData,
                      category: e.target.value,
                      rank: e.target.value === "Team" ? "3" : teamFormData.rank,
                    })
                  }
                  className="status-select"
                >
                  <option value="Cabinet">Cabinet</option>
                  <option value="Team">Team Member</option>
                </select>
                <select
                  name="rank"
                  value={teamFormData.rank}
                  onChange={(e) =>
                    setTeamFormData({ ...teamFormData, rank: e.target.value })
                  }
                  className="status-select"
                  disabled={teamFormData.category === "Team"}
                >
                  <option value="1">Rank 1 (President)</option>
                  <option value="2">Rank 2 (Vice President)</option>
                  <option value="3">Rank 3 (Member)</option>
                </select>
              </div>
              <div className="form-group">
                <div
                  className="professional-upload-area"
                  onClick={() => document.getElementById("tm-file").click()}
                >
                  {teamFormData.image ? (
                    <div className="preview-container">
                      <img src={teamFormData.image} alt="preview" />
                    </div>
                  ) : (
                    <p>Click to Upload Photo</p>
                  )}
                  <input
                    type="file"
                    id="tm-file"
                    hidden
                    accept="image/*"
                    onChange={handleTeamImage}
                  />
                </div>
              </div>
              <button type="submit" className="submit-btn">
                SAVE MEMBER
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
