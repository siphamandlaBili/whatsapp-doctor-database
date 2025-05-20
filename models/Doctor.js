const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  practice_name: { type: String, required: true, trim: true },
  first_name: { type: String, required: true, trim: true },
  surname: { type: String, required: true, trim: true },
  mp_number: { type: String, trim: true, default: '' },
  practice_number: { type: String, required: true, trim: true },
  phone_number: { 
    type: String,
    trim: true,
    validate: {
      validator: v => /^[\d\s\+\(\)\-]{6,20}$/.test(v),
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  whatsapp_number: { type: String, trim: true, default: '' },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: v => v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: props => `${props.value} is not a valid email!`
    },
    default: ''
  },
  specialty: { type: String, required: true, trim: true },
  latitude: { type: Number, required: true, min: -90, max: 90 },
  longitude: { type: Number, required: true, min: -180, max: 180 },
  booking_link: { type: String, trim: true, default: '' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);