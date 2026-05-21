const mongoose = require('mongoose');

const salonSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true }, // ej: "peluqueria-de-barrio" para la URL
    address: { type: String, required: true },
    phone: { type: String, required: true },
    // Configuraciones del negocio
    businessHours: {
        monday: { open: String, close: String, isOpen: Boolean },
        tuesday: { open: String, close: String, isOpen: Boolean },
        // ... repetir para el resto de la semana
    },
    // Credenciales de MercadoPago (SaaS: cada uno cobra en su cuenta)
    mercadopago: {
        accessToken: { type: String, select: false }, // 'select: false' por seguridad
        publicKey: { type: String }
    }
}, { timestamps: true });

module.exports = mongoose.model('Salon', salonSchema);