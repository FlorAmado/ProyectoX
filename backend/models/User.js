const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  salonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Salon', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'professional'], default: 'professional' },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }] 
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);