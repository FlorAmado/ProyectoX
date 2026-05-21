const User = require('../models/User');
const Salon = require('../models/Salon');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTRO DE DUEÑO Y PELUQUERÍA
const register = async (req, res) => {
    try {
        const { salonName, slug, address, phone, userName, userEmail, password } = req.body;

        // 1. Verificar si el email o el slug ya existen
        const existingUser = await User.findOne({ email: userEmail });
        if (existingUser) return res.status(400).json({ error: "El email ya está registrado" });

        // 2. Crear la peluquería primero
        const newSalon = new Salon({
            name: salonName,
            slug,
            address,
            phone
        });
        const savedSalon = await newSalon.save();

        // 3. Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Crear el usuario (Dueño) asociado a esa peluquería
        const newUser = new User({
            salonId: savedSalon._id,
            name: userName,
            email: userEmail,
            password: hashedPassword,
            role: 'admin' // Es el dueño
        });
        await newUser.save();

        res.status(201).json({ mensaje: "Peluquería y administrador creados con éxito" });

    } catch (error) {
        res.status(500).json({ error: "Error en el servidor", detalle: error.message });
    }
};

// LOGIN DE USUARIO
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscar al usuario
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

        // 2. Comparar contraseñas
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: "Contraseña incorrecta" });

        // 3. Generar el Token (JWT)
        // Usamos el id del usuario y su rol para permisos futuros
        const token = jwt.sign(
            { id: user._id, role: user.role, salonId: user.salonId },
            process.env.JWT_SECRET, // Tenemos que agregar esto al .env
            { expiresIn: '1d' } // El token dura 1 día
        );

        res.json({
            mensaje: "Login exitoso",
            token,
            usuario: { id: user._id, name: user.name, role: user.role }
        });

    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};

module.exports = { register, login };