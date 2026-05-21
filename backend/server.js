require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Importamos el modelo para hacer la prueba
const Salon = require('./models/Salon');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
connectDB();

// --- RUTA DE PRUEBA TEMPORAL ---
// Sirve para inyectar el primer dato y ver la base en Compass
app.get('/api/test-db', async (req, res) => {
    try {
        const nuevoSalon = new Salon({
            name: "Peluquería El Corte",
            slug: "peluqueria-el-corte",
            address: "Avenida Siempreviva 742",
            phone: "1122334455"
        });

        // Esto guarda el documento en la nube
        await nuevoSalon.save();

        res.json({
            mensaje: "¡Éxito total! Salón guardado en MongoDB",
            salon: nuevoSalon
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// -------------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});