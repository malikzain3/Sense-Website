import React, { useState, useEffect } from "react";
import eventsData from "../eventsData.js";
import galleryData from "../galleryData.js";
import teamData from "../teamData.js";
import "./Dashboard.css";

const Dashboard = () => {
  // --- States ---
  const [events, setEvents] = useState(eventsData);
  const [gallery, setGallery] = useState(galleryData);
  const [team, setTeam] = useState(teamData);

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
  });
  const [teamFormData, setTeamFormData] = useState({
    name: "",
    designation: "",
    image: "",
    category: "Cabinet",
    rank: "3",
  });

  useEffect(() => {
    document.body.style.overflow =
      showForm || showTeamForm ? "hidden" : "unset";
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
    } else {
      setEvents([{ ...formData, id: uniqueId }, ...events]);
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
  };

  // --- Team Handlers ---
  const handleTeamImage = (e) => {
    const file = e.target.files[0];
    if (file)
      setTeamFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
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
    } else {
      setTeam([{ ...teamFormData, id: uniqueId }, ...team]);
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

  return (
    <div className="dashboard-wrapper">
      {/* 1. EVENTS SECTION */}
      <div className="dashboard-section">
        <div className="dashboard-header">
          <h1>
            Manage <span>Events</span>
          </h1>
          <button className="add-main-btn" onClick={() => setShowForm(true)}>
            + Add Event
          </button>
        </div>
        <div className="dashboard-grid">
          {events.map((ev) => (
            <div key={ev.id} className="dash-event-card">
              <div className="card-img-container">
                <img
                  src={ev.image || "https://via.placeholder.com/300x180"}
                  alt=""
                />
                <span className={`status-badge ${ev.status?.toLowerCase()}`}>
                  {ev.status}
                </span>
              </div>
              <div className="dash-card-content">
                <h3>{ev.title}</h3>
                <div className="dash-actions">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setFormData(ev);
                      setCurrentId(ev.id);
                      setIsEditing(true);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() =>
                      setEvents(events.filter((x) => x.id !== ev.id))
                    }
                  >
                    Delete
                  </button>
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
            {/* Yahan humne function ka naam likh diya taake error khatam ho jaye */}
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
                {/* 🔄 CHANGE PHOTO LOGIC */}
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
          <div className="dashboard-card">
            <button className="close-btn" onClick={closeForm}>
              ✕
            </button>
            <h2 className="modal-title">
              {isEditing ? "Edit" : "Add"} <span>Event</span>
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-row">
                <input
                  name="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  placeholder="Date"
                />
                <input
                  name="month"
                  value={formData.month}
                  onChange={(e) =>
                    setFormData({ ...formData, month: e.target.value })
                  }
                  placeholder="Month"
                />
                <select
                  name="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="status-select"
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div className="form-group">
                <label>Event Image</label>
                <div
                  className="professional-upload-area"
                  onClick={() => document.getElementById("ev-file").click()}
                >
                  {formData.image ? (
                    <div className="preview-container">
                      <img src={formData.image} alt="preview" />
                    </div>
                  ) : (
                    <p>Click to Upload Banner</p>
                  )}
                  <input
                    type="file"
                    id="ev-file"
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
              <button type="submit" className="submit-btn">
                SAVE EVENT
              </button>
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
