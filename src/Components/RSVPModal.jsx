import React, { useState, useEffect } from 'react'
import './RSVPModal.css'

const BASE_FIELDS = [
    { name: 'name',      label: 'Full Name',      type: 'text',  placeholder: 'John Doe',            required: true  },
    { name: 'email',     label: 'Email Address',  type: 'email', placeholder: 'john@university.edu', required: true  },
    { name: 'studentId', label: 'Student ID',     type: 'text',  placeholder: 'e.g. 2021-CS-001',    required: true  },
    { name: 'phone',     label: 'Phone Number',   type: 'tel',   placeholder: '+92 300 0000000',     required: false },
]

const FormField = ({ field, value, onChange }) => {
    const { name, label, type, placeholder, required, options } = field

    return (
        <div className="modal-field">
            <label>
                {label}
                {required
                    ? <span className="required"> *</span>
                    : <span className="optional"> (optional)</span>
                }
            </label>

            {type === 'textarea' ? (
                <textarea
                    name={name}
                    placeholder={placeholder || ''}
                    value={value || ''}
                    onChange={onChange}
                    rows={3}
                />
            ) : type === 'select' ? (
                <select name={name} value={value || ''} onChange={onChange}>
                    <option value=''>-- Select --</option>
                    {(options || []).map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            ) : type === 'radio' ? (
                <div className="radio-group">
                    {(options || []).map((opt) => (
                        <label key={opt} className="radio-label">
                            <input
                                type="radio"
                                name={name}
                                value={opt}
                                checked={value === opt}
                                onChange={onChange}
                            />
                            {opt}
                        </label>
                    ))}
                </div>
            ) : (
                <input
                    type={type || 'text'}
                    name={name}
                    placeholder={placeholder || ''}
                    value={value || ''}
                    onChange={onChange}
                />
            )}
        </div>
    )
}

const RSVPModal = ({ eventId, eventTitle, formFields = [], onClose }) => {

    // Build initial form state from base + custom fields
    const allFields = [...BASE_FIELDS, ...formFields]
    const initialForm = allFields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {})

    const [form, setForm]       = useState(initialForm)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError]     = useState('')

    // Lock background scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = 'unset' }
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError('')
    }

    const handleSubmit = async () => {
        // Validate required fields
        const requiredFields = allFields.filter(f => f.required)
        for (const f of requiredFields) {
            if (!form[f.name] || form[f.name].trim() === '') {
                setError(`"${f.label}" is required.`)
                return
            }
        }
        if (!/\S+@\S+\.\S+/.test(form.email)) {
            setError('Please enter a valid email address.')
            return
        }

        setLoading(true)
        try {
            const res = await fetch('http://localhost:5000/api/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventId, eventTitle, ...form })
            })
            const text = await res.text()
            const data = text ? JSON.parse(text) : {}
            if (!res.ok) throw new Error(data.message || 'Registration failed')
            setSuccess(true)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" 
                onClick={(e) => e.stopPropagation()}
                onWheel={(e) => e.stopPropagation()}
            >

                <button className="modal-close" onClick={onClose}>✕</button>

                {success ? (
                    <div className="modal-success">
                        <div className="success-icon">✓</div>
                        <h2>You're Registered!</h2>
                        <p>Thanks for signing up for <strong>{eventTitle}</strong>. See you there!</p>
                        <button className="modal-submit-btn" onClick={onClose}>Close</button>
                    </div>
                ) : (
                    <>
                        <div className="modal-header">
                            <h2>Register for Event</h2>
                            <p className="modal-event-title">{eventTitle}</p>
                        </div>

                        <div className="modal-body">
                            {allFields.map((field) => (
                                <FormField
                                    key={field.name}
                                    field={field}
                                    value={form[field.name]}
                                    onChange={handleChange}
                                />
                            ))}

                            {error && <p className="modal-error">{error}</p>}

                            <button className="modal-submit-btn" onClick={handleSubmit} disabled={loading}>
                                {loading ? 'Registering...' : 'Confirm Registration'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default RSVPModal