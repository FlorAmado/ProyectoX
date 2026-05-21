const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    salonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Salon', required: true },
    name: { type: String, required: true },
    description: { type: String },
    duration: { type: Number, required: true }, // En minutos (ej: 30, 60, 120)
    price: { type: Number, required: true },
    depositAmount: { type: Number, required: true } // El monto que cobraremos por MercadoPago
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);