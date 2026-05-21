const appointmentSchema = new mongoose.Schema({
    salonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Salon', required: true },
    professionalId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },

    // Datos del cliente
    client: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },

    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },

    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },

    payment: {
        preferenceId: { type: String }, // ID de la preferencia de MP
        paymentId: { type: String },    // ID de la transacción final
        status: { type: String, default: 'pending' },
        amountPaid: { type: Number }
    }
}, { timestamps: true });

// Índice para búsquedas rápidas en el calendario por fecha y profesional
appointmentSchema.index({ professionalId: 1, startTime: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);