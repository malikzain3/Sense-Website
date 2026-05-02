import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import toast from "react-hot-toast";
import { supabase } from "../supabase";



const Dashboard = () => {

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Login First!");
        window.location.href = '/LoginPage';
      }
    };
    checkSession();
  }, []);

  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  // Track original state
  const [baselineEvents, setBaselineEvents] = useState([]);
  const [baselineGallery, setBaselineGallery] = useState([]);
  const [baselineTeam, setBaselineTeam] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState({
    title: "", description: "", date: "", month: "", year: "",
    time: "", venue: "", image_url: "", status: "upcoming",
    register_link: "", drive_link: "",
  });

  const [teamFormData, setTeamFormData] = useState({
    name: "", role: "", image_url: "", category: "Cabinet", rank: "3",
  });

  // Fetch all data
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    const [ev, gal, tm] = await Promise.all([
      supabase.from('events').select('*').order('created_at', { ascending: false }),
      supabase.from('gallery').select('*').order('created_at', { ascending: false }),
      supabase.from('team').select('*').order('rank', { ascending: true }),
    ]);

    if (ev.data) {
      setEvents(ev.data);
      setBaselineEvents(JSON.parse(JSON.stringify(ev.data)));
    }
    if (gal.data) {
      setGallery(gal.data);
      setBaselineGallery(JSON.parse(JSON.stringify(gal.data)));
    }
    if (tm.data) {
      setTeam(tm.data);
      setBaselineTeam(JSON.parse(JSON.stringify(tm.data)));
    }
    setLoading(false);
  };

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

  // Check if data changed
  const hasChanges =
    JSON.stringify(events) !== JSON.stringify(baselineEvents) ||
    JSON.stringify(gallery) !== JSON.stringify(baselineGallery) ||
    JSON.stringify(team) !== JSON.stringify(baselineTeam);

  // --- Event Handlers ---
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileName = `events/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from('Images').upload(fileName, file);
    if (error) { toast.error("Image upload failed!"); console.error(error); return; }
    const { data } = supabase.storage.from('Images').getPublicUrl(fileName);
    setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
    toast.success("Image uploaded! 📸");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      setEvents(events.map(ev => ev.id === currentId ? { ...formData, id: currentId } : ev));
      toast.success("Event added!");
      setTimeout(() => { toast.success(" Click SAVE to confirm"); }, 2000);
    } else {
      const newEvent = { ...formData, id: Date.now() };
      setEvents([newEvent, ...events]);
      toast.success("Event added!");
      setTimeout(() => { toast.success(" Click SAVE to confirm"); }, 2000);
    }
    closeForm();
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(ev => ev.id !== id));
    toast.success("Event removed!");
    setTimeout(() => { toast.success(" Click SAVE to confirm"); }, 2000);
  };

  // --- Gallery Handlers ---
  const handleGalleryUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileName = `gallery/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from('Images').upload(fileName, file);
    if (error) { toast.error("Upload failed!"); console.error(error); return; }
    const { data } = supabase.storage.from('Images').getPublicUrl(fileName);
    const newPhoto = { id: Date.now(), image_url: data.publicUrl, caption: '' };
    setGallery([newPhoto, ...gallery]);
    toast.success("Photo added!");
    setTimeout(() => { toast.success(" Click SAVE to confirm"); }, 2000);
  };

  const handleDeleteGallery = (id) => {
    setGallery(gallery.filter(g => g.id !== id));
    toast.success("Photo removed!");
    setTimeout(() => { toast.success(" Click SAVE to confirm"); }, 2000);
  };

  // --- Team Handlers ---
  const handleTeamImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileName = `team/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from('Images').upload(fileName, file);
    if (error) { toast.error("Upload failed!"); console.error(error); return; }
    const { data } = supabase.storage.from('Images').getPublicUrl(fileName);
    setTeamFormData(prev => ({ ...prev, image_url: data.publicUrl }));
    toast.success("Photo uploaded! 📸");
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      setTeam(team.map(m => m.id === currentId ? { ...teamFormData, id: currentId } : m));
      toast.success("Member updated!");
      setTimeout(() => { toast.success(" Click SAVE to confirm"); }, 2000);
    } else {
      const newMember = { ...teamFormData, id: Date.now() };
      setTeam([newMember, ...team]);
      toast.success("Member added!");
      setTimeout(() => { toast.success(" Click SAVE to confirm"); }, 2000);
    }
    closeTeamForm();
  };

  const handleDeleteTeam = (id) => {
    setTeam(team.filter(m => m.id !== id));
    toast.success("Member removed!");
    setTimeout(() => { toast.success(" Click SAVE to confirm"); }, 2000);
  };

  const closeForm = () => {
    setShowForm(false); setIsEditing(false);
    setFormData({ title: "", description: "", date: "", month: "", year: "", time: "", venue: "", image_url: "", status: "upcoming", register_link: "", drive_link: "" });
  };

  const closeTeamForm = () => {
    setShowTeamForm(false); setIsEditing(false);
    setTeamFormData({ name: "", role: "", image_url: "", category: "Cabinet", rank: "3" });
  };

  // SAVE TO DATABASE
  const handleGlobalSave = async () => {
    const loadingToast = toast.loading("Saving changes...");
    try {
      // EVENTS
      const eventsToAdd = events.filter(e => !baselineEvents.some(b => b.id === e.id))
        .map(({ id, created_at, ...rest }) => rest);

      const eventsToUpdate = events.filter(e => baselineEvents.some(b => b.id === e.id && JSON.stringify(e) !== JSON.stringify(b)))
        .map(({ created_at, ...rest }) => rest);

      const eventsToDelete = baselineEvents.filter(b => !events.some(e => e.id === b.id));

      if (eventsToAdd.length > 0) {
        const { error } = await supabase.from('events').insert(eventsToAdd);
        if (error) throw error;
      }
      for (const ev of eventsToUpdate) {
        const { error } = await supabase.from('events').update(ev).eq('id', ev.id);
        if (error) throw error;
      }
      if (eventsToDelete.length > 0) {
        const { error } = await supabase.from('events').delete().in('id', eventsToDelete.map(e => e.id));
        if (error) throw error;
      }

      // TEAM
      const teamToAdd = team.filter(t => !baselineTeam.some(b => b.id === t.id))
        .map(({ id, created_at, ...rest }) => rest);
      const teamToUpdate = team.filter(t => baselineTeam.some(b => b.id === t.id && JSON.stringify(t) !== JSON.stringify(b)))
        .map(({ created_at, ...rest }) => rest);
      const teamToDelete = baselineTeam.filter(b => !team.some(t => t.id === b.id));

      if (teamToAdd.length > 0) {
        const { error } = await supabase.from('team').insert(teamToAdd);
        if (error) throw error;
      }
      for (const tm of teamToUpdate) {
        const { error } = await supabase.from('team').update(tm).eq('id', tm.id);
        if (error) throw error;
      }
      if (teamToDelete.length > 0) {
        const { error } = await supabase.from('team').delete().in('id', teamToDelete.map(t => t.id));
        if (error) throw error;
      }

      // GALLERY
      const galleryToAdd = gallery.filter(g => !baselineGallery.some(b => b.id === g.id))
        .map(({ id, created_at, ...rest }) => rest);
      const galleryToDelete = baselineGallery.filter(b => !gallery.some(g => g.id === b.id));

      if (galleryToAdd.length > 0) {
        const { error } = await supabase.from('gallery').insert(galleryToAdd);
        if (error) throw error;
      }
      if (galleryToDelete.length > 0) {
        const { error } = await supabase.from('gallery').delete().in('id', galleryToDelete.map(g => g.id));
        if (error) throw error;
      }

      // Refresh data completely from server
      await fetchAll();
      toast.success("✅ All changes saved!", { id: loadingToast });

    } catch (error) {
      console.error("Save error:", error);
      toast.error("Save failed! " + (error.message || "Unknown error"), { id: loadingToast });
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '100px', fontSize: '24px' }}>Loading... ⏳</div>;

  return (
    <div className="dashboard-wrapper">

      {/* SAVE BUTTON */}
      <div className="global-save-container">
        <button
          className="global-save-btn"
          disabled={!hasChanges}
          onClick={handleGlobalSave}
        >
          <span className="save-icon">💾</span> {hasChanges ? "SAVE CHANGES" : "No Changes"}
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
                <img src={ev.image_url || "https://via.placeholder.com/300x180"} alt="" />
                <span className={`status-badge ${ev.status?.toLowerCase()}`}>{ev.status}</span>
              </div>
              <div className="dash-card-content">
                <div className="card-date-badge">{ev.date} {ev.month} {ev.year}</div>
                <h3>{ev.title}</h3>
                <p className="card-desc">{ev.description}</p>
                <div className="card-meta">
                  <span>📍 {ev.venue}</span> | <span>⏰ {ev.time}</span>
                </div>
                <div className="dash-actions">
                  <button className="edit-btn" onClick={() => {
                    setFormData(ev); setCurrentId(ev.id);
                    setIsEditing(true); setShowForm(true);
                  }}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteEvent(ev.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="section-divider" />

      {/* 2. GALLERY SECTION */}
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
              <img src={item.image_url} alt="Gallery" />
              <div className="gallery-controls-overlay">
                <button className="control-btn delete-icon" onClick={() => handleDeleteGallery(item.id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="section-divider" />

      {/* 3. TEAM SECTION */}
      <div className="dashboard-section">
        <div className="dashboard-header">
          <h1>Manage <span>Team</span></h1>
          <button className="add-main-btn" onClick={() => setShowTeamForm(true)}>+ Add Member</button>
        </div>
        <div className="dashboard-grid">
          {[...team].sort((a, b) => a.rank - b.rank).map((m) => (
            <div key={m.id} className="dash-event-card">
              <div className="card-img-container">
                <img src={m.image_url || "https://via.placeholder.com/150"} alt="" style={{ height: "220px" }} />
                <span className={`status-badge ${m.category?.toLowerCase()}`}>{m.category}</span>
              </div>
              <div className="dash-card-content" style={{ textAlign: "center" }}>
                <h3>{m.name}</h3>
                <p className="card-meta">{m.role}</p>
                <div className="dash-actions">
                  <button className="edit-btn" onClick={() => {
                    setTeamFormData(m); setCurrentId(m.id);
                    setIsEditing(true); setShowTeamForm(true);
                  }}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteTeam(m.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EVENT MODAL */}
      {showForm && (
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
                  <input placeholder="https://forms.gle/..." value={formData.register_link || ''} onChange={(e) => setFormData({ ...formData, register_link: e.target.value })} />
                </div>
                <div className="input-box">
                  <label>Drive Link</label>
                  <input placeholder="https://drive.google.com/..." value={formData.drive_link || ''} onChange={(e) => setFormData({ ...formData, drive_link: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Event Image</label>
                <div className="professional-upload-area" onClick={() => document.getElementById("ev-file").click()}>
                  {formData.image_url ? <div className="preview-container"><img src={formData.image_url} alt="preview" /></div> : <p>Click to Upload Banner</p>}
                  <input type="file" id="ev-file" hidden accept="image/*" onChange={handleImageUpload} />
                </div>
              </div>
              <button type="submit" className="submit-btn">ADD TO MEMORY</button>
            </form>
          </div>
        </div>
      )}

      {/* TEAM MODAL */}
      {showTeamForm && (
        <div className="modal-overlay">
          <div className="dashboard-card">
            <button className="close-btn" onClick={closeTeamForm}>✕</button>
            <h2 className="modal-title">{isEditing ? "Edit" : "Add"} <span>Member</span></h2>
            <form onSubmit={handleTeamSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input value={teamFormData.name} onChange={(e) => setTeamFormData({ ...teamFormData, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Designation</label>
                <input value={teamFormData.role} onChange={(e) => setTeamFormData({ ...teamFormData, role: e.target.value })} required />
              </div>
              <div className="form-row">
                <select value={teamFormData.category} onChange={(e) => setTeamFormData({ ...teamFormData, category: e.target.value })} className="status-select">
                  <option value="Cabinet">Cabinet</option>
                  <option value="Team">Team Member</option>
                </select>
                <select value={teamFormData.rank} onChange={(e) => setTeamFormData({ ...teamFormData, rank: e.target.value })} className="status-select">
                  <option value="1">Rank 1 (President)</option>
                  <option value="2">Rank 2 (Vice President)</option>
                  <option value="3">Rank 3 (Member)</option>
                </select>
              </div>
              <div className="form-group">
                <div className="professional-upload-area" onClick={() => document.getElementById("tm-file").click()}>
                  {teamFormData.image_url ? <div className="preview-container"><img src={teamFormData.image_url} alt="preview" /></div> : <p>Click to Upload Photo</p>}
                  <input type="file" id="tm-file" hidden accept="image/*" onChange={handleTeamImage} />
                </div>
              </div>
              <button type="submit" className="submit-btn">ADD TO MEMORY</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;