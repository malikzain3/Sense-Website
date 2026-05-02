const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
}))
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err))

// RSVP Schema (ONLY THIS)
const rsvpSchema = new mongoose.Schema({
    eventId:      { type: String, required: true },
    eventTitle:   { type: String, required: true },
    name:         { type: String, required: true },
    email:        { type: String, required: true },
    studentId:    { type: String, required: true },
    phone:        { type: String, default: '' },
    university:   { type: String, default: '' },
    department:   { type: String, default: '' },
    semester:     { type: String, default: '' },
    extraFields:  { type: Map, of: String, default: {} },
    registeredAt: { type: Date, default: Date.now }
})

rsvpSchema.index({ eventId: 1, email: 1 }, { unique: true })
rsvpSchema.index({ eventId: 1, studentId: 1 }, { unique: true })

const RSVP = mongoose.model('RSVP', rsvpSchema)

// RSVP endpoints only
app.post('/api/rsvp', async (req, res) => {
    try {
        const { eventId, eventTitle, name, email, studentId, phone, university, department, semester, ...rest } = req.body

        if (!eventId || !eventTitle || !name || !email || !studentId) {
            return res.status(400).json({ message: 'Missing required fields.' })
        }

        const emailRegex = /\S+@\S+\.\S+/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email address.' })
        }

        const rsvp = new RSVP({
            eventId, eventTitle, name, email, studentId,
            phone, university, department, semester,
            extraFields: rest
        })
        await rsvp.save()

        return res.status(201).json({ message: 'Registration successful!', rsvp })

    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: 'You are already registered for this event.' })
        }
        console.error(err)
        return res.status(500).json({ message: 'Server error. Please try again.' })
    }
})

app.get('/api/rsvp/:eventId', async (req, res) => {
    try {
        const registrations = await RSVP.find({ eventId: req.params.eventId })
            .select('-__v')
            .sort({ registeredAt: -1 })
        return res.json({ count: registrations.length, registrations })
    } catch (err) {
        return res.status(500).json({ message: 'Server error.' })
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))