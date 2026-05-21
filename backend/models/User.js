const userSchema = new mongoose.Schema({
    salonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Salon', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'professional'], default: 'professional' },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }] // Servicios que realiza este empleado
}, { timestamps: true });