require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Salon = require('./models/Salon');// Importamos el modelo para hacer la prueba

const app = express();

// Conectar a MongoDB
connectDB();

// Agregá esta importación arriba de todo con las otras
const authRoutes = require('./routes/authRoutes');

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas Oficiales
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});